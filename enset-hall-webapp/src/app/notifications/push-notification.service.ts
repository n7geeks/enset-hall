import { Injectable } from "@angular/core";
import { PushNotificationModels } from "./push-notification.models";
import { SwPush } from "@angular/service-worker";
import { environment } from "../../environments/environment.prod";
import { Store } from "@ngxs/store";
import { PushNotificationActions } from "./state/push-notification.actions";

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
	constructor(private swPush: SwPush, private store: Store) { }
	public subscribeToNotifications() {
		this.swPush
			.requestSubscription({ serverPublicKey: environment.vapidPublicKey })
			.then(sub => {
				this.store.dispatch(new PushNotificationActions.SubscribeToNotifications(sub));
			})
			.catch(err => console.error("Could not subscribe to notifications", err));
	}
	public sendNotification(notification: PushNotificationModels) { }
}
