import firebase from "firebase/compat";
import { AuthUser } from "../models/AuthUser";

export namespace AuthenticationActions {
	export class SetUser {
		static readonly type = '[Authentication] Set User';
		constructor(public user: AuthUser) { }
	}
	export class GoogleSignIn {
		static readonly type = '[Authentication] Google SignIn';
		constructor() {}
	}
	export class SignOut {
		static readonly type = '[Authentication] SignOut';
	}
}
