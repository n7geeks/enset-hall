import { PushNotificationType } from "./push-notification-type";

export interface PushNotificationModels {
	data: {
		title: string;
		body: string;
		icon: string;
		click_action: string;

	}
	meta: {
		notificationType: string;
		notificationId: string;
	}
}
export type PushNotificationsStateModel = {
	pushSubscription?: PushSubscription;
	preferences: PushNotificationPreferencesStateModel;
};
export type PushNotificationPreferencesStateModel = {
	[pushNotificationType in PushNotificationType]: boolean;
}
