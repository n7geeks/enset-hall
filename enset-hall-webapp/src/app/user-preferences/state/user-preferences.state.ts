import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { UserPreferencesActions } from "./user-preferences.actions";
import { UserPreferencesService } from "../user-preferences.service";
import { SupportedLang, SupportedTheme } from "../types";
import { AlertService } from "../../shared/alert.service";

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
	constructor(
		private UserPreferencesService: UserPreferencesService,
		private alertService: AlertService) {}
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
		this.alertService.showSuccess('PREFERENCES.LANG_UPDATED');
	}
	@Action(UserPreferencesActions.InitTheme)
	initTheme(ctx: StateContext<UserPreferencesStateModel>) {
		this.UserPreferencesService.setTheme(ctx.getState().theme);
	}
	@Action(UserPreferencesActions.ToggleTheme)
	updateTheme(ctx: StateContext<UserPreferencesStateModel>) {
		if (ctx.getState().theme === 'dark') {
			ctx.patchState({
				theme: 'light'
			});
			this.alertService.showSuccess('PREFERENCES.THEME_UPDATED_LIGHT');
		}
		else {
			ctx.patchState({
				theme: 'dark'
			});
			this.alertService.showSuccess('PREFERENCES.THEME_UPDATED_DARK');
		}
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
