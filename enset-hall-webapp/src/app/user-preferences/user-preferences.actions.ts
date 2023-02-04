import { SupportedLang } from "./types";

export namespace UserPreferencesActions {
	export class InitLang {
		static readonly type = '[Preferences.Lang] Initialize Lang';
	}
	export class UpdateLang {
		static readonly type = '[Preferences.Lang] Update Lang';
		constructor(public payload: SupportedLang) { }
	}
}
