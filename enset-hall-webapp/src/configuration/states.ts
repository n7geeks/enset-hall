import { UserPreferencesState } from "../app/user-preferences/state/user-preferences.state";
import { NgxsStoragePluginOptions } from "@ngxs/storage-plugin";
import { StateClass } from "@ngxs/store/internals";
import { ConnectivityState } from "../app/connectivity/connectivity.state";
import { PushNotificationsState } from "../app/notifications/state/push-notifications.state";
import { AuthenticationState } from "../app/authentication/state/authentication.state";
import { ClubsState } from "../app/clubs/clubs.state";
import {ScopesState} from "../app/scopes/scopes.state";
import {ProfilesState} from "../app/profiles/profiles.state";
import {AnnouncementsState} from "../app/announcements/announcements.state";

export const states: StateClass[] = [
	AuthenticationState,
	UserPreferencesState,
	ConnectivityState,
	PushNotificationsState,
	ScopesState,
	ClubsState,
	ProfilesState,
	AnnouncementsState
];
export const storage: NgxsStoragePluginOptions = {
	key: [UserPreferencesState]
};
