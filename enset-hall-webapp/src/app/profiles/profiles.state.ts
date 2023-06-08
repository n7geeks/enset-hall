import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AppUser} from "../authentication/models/AppUser";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ProfilesActions} from "./profiles.actions";
import {Router} from "@angular/router";

@State<AppUser[]>({
	name: 'profiles',
	defaults: []
})
@Injectable()
export class ProfilesState {
	constructor(private afs: AngularFirestore, private router: Router) {}

	@Action(ProfilesActions.GetProfile)
	getProfile(ctx: StateContext<AppUser[]>, action: ProfilesActions.GetProfile) {
		this.afs.collection('users')
			.doc<AppUser>(action.id)
			.valueChanges({ idField: 'id' })
			.subscribe(appUser => {
				if (appUser === undefined) {
					this.router.navigate(['/']);
					return;
				}
				ctx.dispatch(new ProfilesActions.AddProfile(appUser));
			});
	}

	@Action(ProfilesActions.AddProfile)
	addProfile(ctx: StateContext<AppUser[]>, action: ProfilesActions.AddProfile) {
		const state = ctx.getState();
		const exists = state.find(appUser => appUser.id === action.profile.id);
		if (exists) {
			return;
		}
		ctx.setState([...state, action.profile]);
	}

	@Selector()
	static getProfile(state: AppUser[], id: string) {
		return state.find(appUser => appUser.id === id);
	}

}
