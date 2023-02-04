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
		this.UserPreferencesService.initLang(ctx.getState().lang);
	}
	@Action(UserPreferencesActions.UpdateLang)
	updateLang(ctx: StateContext<UserPreferencesStateModel>,
	           { payload }: UserPreferencesActions.UpdateLang) {
		ctx.patchState({
			lang: payload
		});
	}
	@Selector()
	static getLang(state: UserPreferencesStateModel) {
		return state.lang;
	}
}
