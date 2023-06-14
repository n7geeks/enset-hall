import {Action, State, StateContext, Store} from "@ngxs/store";
import {Discussion, Stand, StatelessDiscussion, StatelessStand, UserStandsDiscussionsHearts} from "./stands.models";
import { Injectable } from "@angular/core";
import {StandsActions} from "./stands.actions";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Club} from "../clubs/club.models";
import {AppUser} from "../authentication/models/AppUser";
import {combineLatest, map, take, tap} from "rxjs";

@State<Stand[]>({
	name: "stands",
	defaults: []
})
@Injectable()
export class StandsState {
	constructor(private afs: AngularFirestore,
				private auth: AngularFireAuth,
	            private store: Store) {}
	@Action(StandsActions.FetchStands)
	async fetchStands(ctx: StateContext<Stand[]>, action: StandsActions.FetchStands) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		const clubs$ = this.store
			.select<Club[]>(state => state.clubs);
		const users$ = this.afs
			.collection<AppUser>("users")
			.valueChanges({idField: "id"});
		const stands$ = this.afs
			.collection<StatelessStand>("stands", ref =>
				ref.where("ended", "==", false))
			.valueChanges({idField: "id"});
		const userStandsDiscussionsHearts$ = this.afs
			.collection("user-stands-discussions-hearts")
			.doc<UserStandsDiscussionsHearts>(userId)
			.valueChanges();
		return combineLatest([clubs$, users$, stands$, userStandsDiscussionsHearts$])
			.pipe(map(([clubs, users, stands, userStandsDiscussionsHearts]) => {
				return stands.map(stand => {
					const club = clubs.find(club => club.id === stand.clubId);
					const organizers = users.filter(user => stand.organizersIds.includes(user.id));
					const discussions = stand.discussions.map(discussion => {
						const discusser = users.find(user => user.id === discussion.discusserId);
						const hearted = !userStandsDiscussionsHearts ? false :
							(userStandsDiscussionsHearts[stand.id] && userStandsDiscussionsHearts[stand.id][discussion.id]);
						return {
							...discussion,
							discusser,
							hearted
						} as Discussion;
					});
					return {
						...stand,
						club,
						organizers,
						discussions
					} as Stand;
				})
			}))
			.pipe(tap(stands => ctx.setState(stands)));
	}

	@Action(StandsActions.SubmitDiscussion)
	async submitDiscussion(ctx: StateContext<Stand[]>, action: StandsActions.SubmitDiscussion) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const discusserId = user.uid;
		const {standId, content} = action;
		const discussionId = this.afs.createId();
		const discussion: StatelessDiscussion = {
			discussedAt: (new Date()).getTime(),
			hearts: 0,
			content,
			discusserId,
			id: discussionId
		}
		let discussions: StatelessDiscussion[] | undefined = ctx.getState()
			.find(stand => stand.id === standId)?.discussions;
		if (!discussions) {
			return;
		}
		discussions = discussions.map(discussion => {
			return {
				discussedAt: discussion.discussedAt,
				hearts: discussion.hearts,
				discusserId: discussion.discusserId,
				content: discussion.content,
				id: discussion.id
			} as StatelessDiscussion;
		});
		discussions.push(discussion);
		await this.afs
			.collection("stands")
			.doc(standId)
			.update({
				discussions
			});
	}

	@Action(StandsActions.ToggleHeartDiscussion)
	async heartDiscussion(ctx: StateContext<Stand[]>, action: StandsActions.ToggleHeartDiscussion) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		const {standId, discussionId} = action;
		const stands = ctx.getState();
		const stand = stands.find(stand => stand.id === standId);
		if (!stand) {
			return;
		}

		let hearted = false;

		const discussions = stand.discussions.map(discussion => {
			if (discussion.id === discussionId) {
				hearted = !discussion.hearted;
				const hearts = hearted ? discussion.hearts + 1 : discussion.hearts - 1;
				return {
					hearts,
					id: discussion.id,
					content: discussion.content,
					discusserId: discussion.discusserId,
					discussedAt: discussion.discussedAt
				} as StatelessDiscussion;
			}
			return {
				hearts: discussion.hearts,
				id: discussion.id,
				content: discussion.content,
				discusserId: discussion.discusserId,
				discussedAt: discussion.discussedAt
			} as StatelessDiscussion;
		});

		const userStandsDiscussionsHeartsSnapshot = await this.afs
			.collection("user-stands-discussions-hearts")
			.doc<UserStandsDiscussionsHearts>(userId)
			.ref.get();

		const userStandsDiscussionsHearts = userStandsDiscussionsHeartsSnapshot.data();

		await this.afs
			.collection("stands")
			.doc(standId)
			.update({
				discussions
			});

		if (!userStandsDiscussionsHearts) {
			await this.afs
				.collection("user-stands-discussions-hearts")
				.doc(userId)
				.set({
					[standId]: {
						[discussionId]: hearted
					}
				});
		} else {
			if (!userStandsDiscussionsHearts[standId]) {
				await this.afs
					.collection("user-stands-discussions-hearts")
					.doc(userId)
					.update({
						[standId]: {
							[discussionId]: hearted
						}
					});
			} else {
				await this.afs
					.collection("user-stands-discussions-hearts")
					.doc(userId)
					.update({
						[standId]: {
							...userStandsDiscussionsHearts[standId],
							[discussionId]: hearted
						}
					});
			}
		}

	}

}