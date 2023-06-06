import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { Actions, Select, Store } from "@ngxs/store";
import { UserPreferencesActions } from "./user-preferences/state/user-preferences.actions";
import { UserPreferencesState, UserPreferencesStateModel } from "./user-preferences/state/user-preferences.state";
import { Observable, Subscription } from "rxjs";
import { UserPreferencesService } from "./user-preferences/user-preferences.service";
import { ConnectivityStatus } from "./connectivity/connectivity.state";
import { ConnectivityActions } from "./connectivity/connectivity.actions";
import { PushNotificationService } from "./notifications/push-notification.service";
@Component({
	selector: 'n7h-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule
	],
})
export class AppComponent implements OnInit, OnDestroy {
	constructor(private store: Store,
	            private actions: Actions,
				private router: Router,
	            private preferencesService: UserPreferencesService,
	            private pushNotificationService: PushNotificationService) {}
	@Select(UserPreferencesState) preferences$?: Observable<UserPreferencesStateModel>;
	preferencesSubscription?: Subscription;
	signOutSubscription?: Subscription;
	public ngOnInit(): void {
        this.store.dispatch(new UserPreferencesActions.InitLang());
		this.store.dispatch(new UserPreferencesActions.InitTheme());
		if (this.preferences$) {
			this.preferencesSubscription = this.preferences$
				.subscribe(preferences => {
				this.preferencesService.setLang(preferences.lang);
				this.preferencesService.setTheme(preferences.theme);
			});
		}
		const connectivity = navigator.onLine ? ConnectivityStatus.Online : ConnectivityStatus.Offline;
		this.store.dispatch(new ConnectivityActions.UpdateStatus(connectivity));
		window.addEventListener("online", () => {
			this.store.dispatch(new ConnectivityActions.UpdateStatus(ConnectivityStatus.Online));
		});
		window.addEventListener("offline", () => {
			this.store.dispatch(new ConnectivityActions.UpdateStatus(ConnectivityStatus.Offline));
		});
		// this.pushNotificationService.subscribeToNotifications();
		// this.actions.pipe(ofActionDispatched(AuthenticationActions.SignOut))
		// 	.subscribe(() => {
		// 		this.router.navigate(['/auth']);
		// 	});
    }
	public ngOnDestroy(): void {
		if (this.preferencesSubscription && !this.preferencesSubscription.closed) {
			this.preferencesSubscription.unsubscribe();
		}
		if (this.signOutSubscription && !this.signOutSubscription.closed) {
			this.signOutSubscription.unsubscribe();
		}
	}
}
