import {AppUser} from "../authentication/models/AppUser";

export namespace ProfilesActions {
	export class GetProfile {
		static readonly type = "[Profiles] Get Profile";
		constructor(public id: string) {}
	}
	export class AddProfile {
		static readonly type = "[Profiles] Add Profile";
		constructor(public profile: AppUser) {}
	}
}
