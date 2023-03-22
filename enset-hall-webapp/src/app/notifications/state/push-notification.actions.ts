import {
	PushNotificationModels,
	PushNotificationPreferencesStateModel
} from "../push-notification.models";

export namespace PushNotificationActions {
	export class SubscribeToNotifications {
		static readonly type = '[PushNotificationModels] SubscribeToNotifications';
		constructor(public subscription: PushSubscription) {}
	}
	export class UpdatePushNotificationPreferences {
		static readonly type = '[PushNotificationModels] UpdatePushNotificationPreferences';
		constructor(public preferences: PushNotificationPreferencesStateModel) {}
	}
	export class SendNotification {
		static readonly type = '[PushNotificationModels] SendNotification';
		constructor(public notification: PushNotificationModels) {}
	}
}
