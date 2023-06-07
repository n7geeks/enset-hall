import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {StatelessClub, Club, UserClubsData} from "./club.models";
import {ClubsActions} from "./clubs.actions";
import {AngularFireAuth} from "@angular/fire/compat/auth";



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
					return;
				}
				this.afs.collection<StatelessClub>('clubs')
					.valueChanges({idField: 'id'})
					.subscribe(clubs => {
						const clubWithState: Club[] = clubs.map(club => {
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

