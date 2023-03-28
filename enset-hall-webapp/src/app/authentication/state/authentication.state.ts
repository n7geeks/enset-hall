import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthenticationActions } from "./authentication.actions";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { of, Subscription, switchMap } from "rxjs";
import firebase from "firebase/compat/app";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "../../shared/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AuthUser } from "../models/AuthUser";
import { AppUser } from "../models/AppUser";
import { UserScopes } from "../models/UserScopes";
export interface AuthenticationStateModel {
	user?: AuthUser;
	isAuthenticated?: boolean;
	inProgress: boolean;
}
@State<AuthenticationStateModel>({
	name: 'authentication',
	defaults: {
		user: undefined,
		isAuthenticated: false,
		inProgress: false
	}
})
@Injectable()
export class AuthenticationState {
	private readonly provider;
	private userSubscription!: Subscription;
	private appUserSubscription!: Subscription;
	constructor(
		private angularFireAuth: AngularFireAuth,
		private router: Router,
		private afs: AngularFirestore,
		private translateService: TranslateService,
		private alertService: AlertService) {
		this.provider = new firebase.auth.GoogleAuthProvider();
	}
	ngxsOnInit(ctx: StateContext<AuthenticationStateModel>) {
		this.userSubscription = this.angularFireAuth.user.subscribe(user => {
			if (user === null) {
				return;
			}
			this.appUserSubscription = this.afs
				.collection('users')
				.doc<AppUser>(user.uid)
				.valueChanges()
				.pipe(switchMap(appUser => {
					if (appUser === undefined) {
						return of(undefined);
					}
					return this.afs.collection('scopes')
						.doc<UserScopes>(appUser.scope_id)
						.valueChanges()
						.pipe(switchMap(userScopes => {
							if (userScopes === undefined) {
								return of(undefined);
							}
							return of({
								uid: user.uid,
								scopes: userScopes,
								displayName: appUser.displayName,
								email: appUser.email,
								photoUrl: appUser.photoUrl,
								deleted: appUser.deleted,
							} as AuthUser);
						}));
				}))
				.subscribe(async authUser => {
					if (authUser === undefined) {
						return;
					}
					ctx.dispatch(new AuthenticationActions.SetUser(authUser));
					if (this.router.url === '/login') {
						await this.router.navigate(['/']);
					}
				});
		});
	}
	ngxsOnDestroy() {
		this.userSubscription.unsubscribe();
	}
	@Selector()
	static isAuthenticated(state: AuthenticationStateModel) {
		return state.isAuthenticated;
	}
	@Selector()
	static inProgress(state: AuthenticationStateModel) : boolean {
		return state.inProgress;
	}
	@Action(AuthenticationActions.GoogleSignIn)
	signIn({ patchState }: StateContext<AuthenticationStateModel>) {
		patchState({ inProgress: true });
		this.angularFireAuth
			.signInWithPopup(this.provider)
			.finally(() => patchState({ inProgress: false }));
	}
	@Action(AuthenticationActions.SignOut)
	async signOut({ patchState }: StateContext<AuthenticationStateModel>) {
		await this.angularFireAuth.signOut();
		this.appUserSubscription.unsubscribe();
		await this.router.navigate(['/login']);
		patchState({ user: undefined, isAuthenticated: false });
	}
	@Action(AuthenticationActions.SetUser)
	async setUser({ patchState }: StateContext<AuthenticationStateModel>,
	        { user }: AuthenticationActions.SetUser) {
		patchState({ user, isAuthenticated: true, inProgress: false });
		this.alertService.showSuccess(
			`${this.translateService.instant("AUTH.WELCOMING")}, ${user?.displayName}!`
		);
	}
}
