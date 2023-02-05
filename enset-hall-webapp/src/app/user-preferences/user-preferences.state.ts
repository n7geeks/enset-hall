import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { UserPreferencesActions } from "./user-preferences.actions";
import { UserPreferencesService } from "./user-preferences.service";
import { SupportedLang, SupportedTheme } from "./types";

export interface UserPreferencesStateModel {
	lang: SupportedLang;
	theme: SupportedTheme;
}

@State<UserPreferencesStateModel>({
	name: "preferences",
	defaults: {
		lang: 'fr',
		theme: 'dark'
	}
})
@Injectable()
export class UserPreferencesState {
	constructor(private UserPreferencesService: UserPreferencesService) {}
	@Action(UserPreferencesActions.InitLang)
	initLang(ctx: StateContext<UserPreferencesStateModel>) {
		this.UserPreferencesService.setLang(ctx.getState().lang);
	}
	@Action(UserPreferencesActions.UpdateLang)
	updateLang(ctx: StateContext<UserPreferencesStateModel>,
	           { payload }: UserPreferencesActions.UpdateLang) {
		ctx.patchState({
			lang: payload
		});
	}
	@Action(UserPreferencesActions.InitTheme)
	initTheme(ctx: StateContext<UserPreferencesStateModel>) {
		this.UserPreferencesService.setTheme(ctx.getState().theme);
	}
	@Action(UserPreferencesActions.ToggleTheme)
	updateTheme(ctx: StateContext<UserPreferencesStateModel>) {
		ctx.patchState({
			theme: ctx.getState().theme === 'dark' ? 'light' : 'dark'
		});
	}
	@Selector()
	static getLang(state: UserPreferencesStateModel) {
		return state.lang;
	}

	@Selector()
	static getTheme(state: UserPreferencesStateModel) {
		return state.theme;
	}
}
