import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {StatelessClub, Club, UserClubsData, UserClubState} from "./club.models";
import {ClubsActions} from "./clubs.actions";
import {AngularFireAuth} from "@angular/fire/compat/auth";

const defaultUserClubState: UserClubState = {
	isMember: false,
	isOfficeMember: false,
	isGodfather: false,
	isPending: false
}


@State<Club[]>({
	name: "clubs",
	defaults: []
})
@Injectable()
export class ClubsState {
	constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}


	@Action(ClubsActions.GetClubs)
	async getClubs(ctx: StateContext<Club[]>, action: ClubsActions.GetClubs) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		this.afs
			.collection('user-clubs')
			.doc<UserClubsData>(userId)
			.valueChanges()
			.subscribe(userClubsData => {
				if (!userClubsData) {
					this.afs.collection<UserClubsData>('user-clubs')
						.doc(userId)
						.set({});
					return;
				}
				this.afs.collection<StatelessClub>('clubs')
					.valueChanges({idField: 'id'})
					.subscribe(clubs => {
						const clubWithState: Club[] = clubs.map(club => {
							if (!userClubsData[club.id]) {
								this.afs.collection<UserClubsData>('user-clubs')
									.doc(userId)
									.set({
										[club.id]: defaultUserClubState
									}, {merge: true});
							}
							return {
								...club,
								...userClubsData[club.id]
							}
						});
						ctx.dispatch(new ClubsActions.SetClubs(clubWithState));
				});
			});
	}

	@Action(ClubsActions.SetClubs)
	setClubs(ctx: StateContext<Club[]>, action: ClubsActions.SetClubs) {
		ctx.setState(action.clubs);
	}


}

