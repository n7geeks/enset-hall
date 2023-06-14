import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import { AuthenticationActions } from "./authentication.actions";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { of, Subscription, switchMap } from "rxjs";
import firebase from "firebase/compat/app";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AuthUser } from "../models/AuthUser";
import { AppUser } from "../models/AppUser";
import { UserScopes } from "../models/UserScopes";
import { YearOfStudyService } from "../year-of-study.service";
import {ClubsActions} from "../../clubs/clubs.actions";
import {MatDialog} from "@angular/material/dialog";
import {NotEnsetStudentDialog} from "../components/ui/not-enset-student.dialog";
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
	alertShown = false;
	constructor(
		private store: Store,
		private angularFireAuth: AngularFireAuth,
		private router: Router,
		private dialog: MatDialog,
		private afs: AngularFirestore) {
		this.provider = new firebase.auth.GoogleAuthProvider();
	}
	ngxsOnInit(ctx: StateContext<AuthenticationStateModel>) {
		const showString = localStorage.getItem('not-student-dialog-not-show');
		if (showString === null || showString === undefined) {
			this.alertShown = false;
		}
		this.alertShown = JSON.parse(showString!);
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
	@Selector()
	static userYearOfStudy(state: AuthenticationStateModel) {
		if (state.user === undefined) {
			return undefined;
		}
		return new YearOfStudyService().getYearOfStudy(
			parseInt(state.user.scopes.promo),
			state.user.scopes.diploma);
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
		if (user.scopes.role === 'external' && !this.alertShown) {
			this.dialog.open(NotEnsetStudentDialog, {
				disableClose: true,
				width: '650px',
			});
			this.alertShown = true;
		}
		this.store.dispatch(new ClubsActions.GetClubs());
	}

	@Action(AuthenticationActions.SetUserScope)
	async setUserScope(ctx: StateContext<AuthenticationStateModel>,
                       	        { scopeId }: AuthenticationActions.SetUserScope) {
		const user = ctx.getState().user;
		if (user === undefined) {
			return;
		}
		const appUser = await this.afs
			.collection('users')
			.doc<AppUser>(user.uid)
			.update({ scope_id: scopeId });
	}
}
