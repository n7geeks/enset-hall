import {Action, State, StateContext, Store} from "@ngxs/store";
import {Discussion, Stand, StatelessStand, UserStandsDiscussionsHearts} from "./stands.models";
import { Injectable } from "@angular/core";
import {StandsActions} from "./stands.actions";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthUser} from "../authentication/models/AuthUser";
import {Club} from "../clubs/club.models";
import {AppUser} from "../authentication/models/AppUser";
import {combineLatest, map, tap} from "rxjs";

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
}