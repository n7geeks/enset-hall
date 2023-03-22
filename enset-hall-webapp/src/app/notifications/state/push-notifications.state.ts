import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { PushNotificationType } from "../push-notification-type";
import { PushNotificationActions } from "./push-notification.actions";
import { PushNotificationsStateModel } from "../push-notification.models";

@State<PushNotificationsStateModel>({
	name: "pushNotifications",
	defaults: {
		pushSubscription: undefined,
		preferences: {
			[PushNotificationType.NewMessage]: true,
			[PushNotificationType.AcceptedClubJoinRequest]: true,
			[PushNotificationType.NewReactionOnPost]: true,
			[PushNotificationType.NewReactionOnComment]: true,
			[PushNotificationType.NewCommentOnPost]: true
		}
	}
})
@Injectable()
export class PushNotificationsState {
	constructor() {}
	@Action(PushNotificationActions.SubscribeToNotifications)
	public subscribeToNotifications(ctx: StateContext<PushNotificationsStateModel>, action: PushNotificationActions.SubscribeToNotifications) {
		ctx.patchState({ pushSubscription: action.subscription });
	}
	@Action(PushNotificationActions.UpdatePushNotificationPreferences)
	public updatePushNotificationPreferences(
		ctx: StateContext<PushNotificationsStateModel>,
		action: PushNotificationActions.UpdatePushNotificationPreferences) {
		ctx.patchState({ preferences: action.preferences });
	}

}
