import { UserPreferencesState } from "../app/user-preferences/user-preferences.state";
import { NgxsStoragePluginOptions } from "@ngxs/storage-plugin";
import { StateClass } from "@ngxs/store/internals";

export const states: StateClass[] = [
	UserPreferencesState
];

export const storage: NgxsStoragePluginOptions = {
	key: [UserPreferencesState]
};
