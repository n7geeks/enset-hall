import { SupportedLang } from "./types";

export namespace UserPreferencesActions {
	export class InitLang {
		static readonly type = '[Preferences.Lang] Initialize Lang';
	}
	export class UpdateLang {
		static readonly type = '[Preferences.Lang] Update Lang';
		constructor(public payload: SupportedLang) { }
	}

	export class InitTheme {
		static readonly type = '[Preferences.Theme] Initialize Theme';
	}
	export class ToggleTheme {
		static readonly type = '[Preferences.Theme] Toggle Theme';
	}
}
