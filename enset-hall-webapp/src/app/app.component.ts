import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { Select, Store } from "@ngxs/store";
import { UserPreferencesActions } from "./user-preferences/user-preferences.actions";
import { UserPreferencesState, UserPreferencesStateModel } from "./user-preferences/user-preferences.state";
import { Observable, Subscription } from "rxjs";
import { UserPreferencesService } from "./user-preferences/user-preferences.service";
import {
	ChangeLanguageWidgetComponent
} from "./user-preferences/components/change-language-widget.component";
import {
	ToggleThemeWidgetComponent
} from "./user-preferences/components/toggle-theme-widget.component";
@Component({
	selector: 'enset-hall-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule,
		ToggleThemeWidgetComponent,
		ChangeLanguageWidgetComponent
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
	constructor(private store: Store, private preferencesService: UserPreferencesService) {}
	@Select(UserPreferencesState) preferences$?: Observable<UserPreferencesStateModel>;
	preferencesSubscription?: Subscription;
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
    }
	public ngOnDestroy(): void {
		if (this.preferencesSubscription && !this.preferencesSubscription.closed) {
			this.preferencesSubscription.unsubscribe();
		}
	}
}
