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
import UserCredential = firebase.auth.UserCredential;
import { Prospect } from "../models/Prospect";
import { User } from "../models/User";
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
				.doc<User>(user.uid)
				.valueChanges()
				.pipe(switchMap((u: User | undefined) => {
					if (u === undefined) {
						return of(undefined);
					}
					if (u.ensetien && user.email !== undefined && user.email !== null) {
						return this.afs
							.collection('prospects')
							.doc<Prospect>(user.email)
							.valueChanges()
							.pipe(switchMap((p: Prospect | undefined) => {
								if (p === undefined) {
									return of(undefined);
								}
								if (!p.allowed) {
									this.alertService.showError(this.translateService.instant('AUTH.ALERT.NOT_ALLOWED'));
									this.angularFireAuth.signOut();
									return of(undefined);
								}
								return of({
									uid: user.uid,
									email: user.email,
									ensetien: u.ensetien,
									deleted: u.deleted,
									displayName: p.displayName,
									scopes: p.scopes,
									photoURL: user.photoURL
								} as AuthUser);
							}));
					}
					return of({
						uid: user.uid,
						email: user.email,
						ensetien: u.ensetien,
						deleted: u.deleted,
						displayName: user.displayName,
						scopes: [],
						photoURL: user.photoURL
					} as AuthUser);
				}))
				.subscribe(authUser => {
					if (authUser === undefined) {
						return;
					}
					ctx.dispatch(new AuthenticationActions.SetUser(authUser));
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
		await this.router.navigate(['/auth']);
		patchState({ user: undefined, isAuthenticated: false });
	}
	@Action(AuthenticationActions.SetUser)
	async setUser({ patchState }: StateContext<AuthenticationStateModel>,
	        { user }: AuthenticationActions.SetUser) {
		patchState({ user, isAuthenticated: true, inProgress: false });
		this.alertService.showSuccess(
			`${this.translateService.instant("AUTH.WELCOMING")}, ${user?.displayName}!`
		);
		await this.router.navigate(['/home']);
	}
}
