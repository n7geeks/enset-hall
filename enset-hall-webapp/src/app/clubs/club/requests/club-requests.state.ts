import {ClubRequest, ClubRequestsStateModel, FirebaseClubRequest} from "./club-requests.models";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ClubRequestsActions} from "./club-requests.actions";
import {StatelessClub, UserClubsData} from "../../club.models";
import {AppUser} from "../../../authentication/models/AppUser";
import { take } from "rxjs";

@State<ClubRequestsStateModel>({
	name: "clubRequests",
})
@Injectable()
export class ClubRequestsState {
	constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

	@Action(ClubRequestsActions.AddClubRequest)
	async addClubRequest(ctx: StateContext<ClubRequestsStateModel>, action: ClubRequestsActions.AddClubRequest) {
		const user = await this.auth.currentUser;
		if (!user) return;
		const userId = user.uid;
		const { clubId} = action;
		await this.afs
			.collection<FirebaseClubRequest>("club-requests")
			.add({
				clubId,
				requesterId: userId,
				resolved: false,
				createdAt: new Date().toISOString(),
				id: this.afs.createId()
			});
		await this.afs
			.collection('user-clubs')
			.doc<UserClubsData>(userId)
			.update({
				[clubId]: {
					isMember: false,
					isPending: true,
					isGodfather: false,
					isOfficeMember: false
				}
			});
	}

	@Action(ClubRequestsActions.CancelClubRequest)
	async cancelClubRequest(ctx: StateContext<ClubRequestsStateModel>, action: ClubRequestsActions.CancelClubRequest) {
		const user = await this.auth.currentUser;
		if (!user) return;
		const userId = user.uid;
		const { clubId} = action;
		const requests = await this.afs
			.collection<FirebaseClubRequest>("club-requests")
			.ref
			.where("clubId", "==", clubId)
			.where("requesterId", "==", userId)
			.where("resolved", "==", false)
			.get();
		if (requests.docs.length === 0) return;
		const request = requests.docs[0];
		await this.afs
			.collection("club-requests")
			.doc(request.id)
			.delete();
		await this.afs
			.collection('user-clubs')
			.doc<UserClubsData>(userId)
			.update({
				[clubId]: {
					isMember: false,
					isPending: false,
					isGodfather: false,
					isOfficeMember: false
				}
			});
	}

	@Action(ClubRequestsActions.GetClubRequests)
	async getClubRequests(ctx: StateContext<ClubRequestsStateModel>, action: ClubRequestsActions.GetClubRequests) {
		const { clubId } = action;
		const state = ctx.getState();
		if (state[clubId]) return;
		this.afs
			.collection<FirebaseClubRequest>("club-requests", ref => ref
				.where("clubId", "==", clubId)
				.where("resolved", "==", false))
			.valueChanges({ idField: "id" })
			.subscribe(async (requests) => {
				const mappedRequests =
					requests.map(async (request) => {
						const requesterId = request.requesterId;
						const requesterSnapshot = await this.afs
							.collection("users")
							.doc<AppUser>(requesterId)
							.ref.get();
						const requester = requesterSnapshot.data();
						return {
							...request,
							requester
						} as ClubRequest;
					});
				const resolvedRequests = await Promise.all(mappedRequests);
				ctx.dispatch(new ClubRequestsActions.SetClubRequests(resolvedRequests, clubId));
			});
	}
	@Action(ClubRequestsActions.SetClubRequests)
	setClubRequests(ctx: StateContext<ClubRequestsStateModel>, action: ClubRequestsActions.SetClubRequests) {
		const { requests, clubId } = action;
		ctx.patchState({
			[clubId]: requests
		});
	}

	@Action(ClubRequestsActions.RejectClubRequest)
	async rejectClubRequest(ctx: StateContext<ClubRequestsStateModel>, action: ClubRequestsActions.RejectClubRequest) {
		const user = await this.auth.currentUser;
		if (!user) return;
		const userId = user.uid;
		const { requestId } = action;
		const request = await this.afs
			.collection<FirebaseClubRequest>("club-requests")
			.doc(requestId)
			.ref.get();
		if (!request.exists) return;
		const clubId = request.data()?.clubId;
		if (!clubId) return;
		await this.afs
			.collection("club-requests")
			.doc(requestId)
			.update({
				resolved: true,
				resolvedAt: new Date().toISOString(),
				resolvedBy: userId
			});
		await this.afs
			.collection('user-clubs')
			.doc<UserClubsData>(request.data()?.requesterId)
			.update({
				[clubId]: {
					isMember: false,
					isPending: false,
					isGodfather: false,
					isOfficeMember: false
				}
			});
	}

	@Action(ClubRequestsActions.AcceptClubRequest)
	async acceptClubRequest(ctx: StateContext<ClubRequestsStateModel>, action: ClubRequestsActions.AcceptClubRequest) {
		const user = await this.auth.currentUser;
		if (!user) return;
		const userId = user.uid;
		const { requestId } = action;
		const requestSnap = await this.afs
			.collection<FirebaseClubRequest>("club-requests")
			.doc(requestId)
			.ref.get();
		if (!requestSnap.exists) return;
		const request = requestSnap.data();
		if (!request) return;
		const clubId = request.clubId;
		if (!clubId) return;
		await this.afs
			.collection("club-requests")
			.doc(requestId)
			.update({
				resolved: true,
				resolvedAt: new Date().toISOString(),
				resolvedBy: userId
			});
		await this.afs
			.collection('user-clubs')
			.doc<UserClubsData>(request.requesterId)
			.update({
				[clubId]: {
					isMember: true,
					isPending: false,
					isGodfather: false,
					isOfficeMember: false
				}
			});
		this.afs
			.collection<StatelessClub>("clubs")
			.doc(clubId)
			.valueChanges()
			.pipe(take(1))
			.subscribe(async (club) => {
				if (!club) return;
				const userToBeAddedSnap = await this.afs
					.collection("users")
					.doc<AppUser>(request.requesterId)
					.ref.get();
				if (!userToBeAddedSnap.exists) return;
				const userToBeAdded = userToBeAddedSnap.data();
				if (!userToBeAdded) return;
				const lastChapter = club.chapters.sort((a, b) => b.year - a.year)[0];
				lastChapter.members.push({
					...userToBeAdded,
					id: request.requesterId
				});
				club.chapters = club.chapters.map((chapter) => {
					if (chapter.year === lastChapter.year) return lastChapter;
					return chapter;
				});
				await this.afs
					.collection("clubs")
					.doc(clubId)
					.update({
						chapters: club.chapters
					});
			});

	}

	@Action(ClubRequestsActions.LeaveClub)
	async leaveClub(ctx: StateContext<ClubRequestsStateModel>, action: ClubRequestsActions.LeaveClub) {
		const user = await this.auth.currentUser;
		if (!user) return;
		const userId = user.uid;
		const { clubId } = action;
		const club = await this.afs
			.collection<StatelessClub>("clubs")
			.doc(clubId)
			.ref.get();
		if (!club.exists) return;
		const clubData = club.data();
		if (!clubData) return;
		const lastChapter = clubData.chapters.sort((a, b) => b.year - a.year)[0];
		lastChapter.members = lastChapter.members.filter((member) => member.id !== userId);
		lastChapter.officeMembers = lastChapter.officeMembers.filter((member) => member.id !== userId);
		clubData.chapters = clubData.chapters.map((chapter) => {
			if (chapter.year === lastChapter.year) return lastChapter;
			return chapter;
		});
		console.log(clubData);
		await this.afs
			.collection("clubs")
			.doc(clubId)
			.update({
				chapters: clubData.chapters
			});
		await this.afs
			.collection('user-clubs')
			.doc<UserClubsData>(userId)
			.update({
				[clubId]: {
					isMember: false,
					isPending: false,
					isGodfather: false,
					isOfficeMember: false
				}
			});
	}

}
