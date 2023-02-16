import { UserPreferencesState } from "../app/user-preferences/user-preferences.state";
import { NgxsStoragePluginOptions } from "@ngxs/storage-plugin";
import { StateClass } from "@ngxs/store/internals";
import { ConnectivityState } from "../app/connectivity/connectivity.state";

export const states: StateClass[] = [
	UserPreferencesState,
	ConnectivityState
];

export const storage: NgxsStoragePluginOptions = {
	key: [UserPreferencesState]
};
