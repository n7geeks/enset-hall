import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { Select, Store } from "@ngxs/store";
import { UserPreferencesActions } from "./user-preferences/user-preferences.actions";
import { UserPreferencesState, UserPreferencesStateModel } from "./user-preferences/user-preferences.state";
import { Observable } from "rxjs";
import { UserPreferencesService } from "./user-preferences/user-preferences.service";
import {
	ChangeLanguageWidgetComponent
} from "./user-preferences/components/change-language-widget/change-language-widget.component";
@Component({
	selector: 'enset-hall-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule,
		ChangeLanguageWidgetComponent
	]
})
export class AppComponent implements OnInit {
	constructor(private store: Store, private preferencesService: UserPreferencesService) {}
	@Select(UserPreferencesState) preferences$!: Observable<UserPreferencesStateModel>;
	ngOnInit(): void {
        this.store.dispatch(new UserPreferencesActions.InitLang());
		this.preferences$.subscribe(preferences => {
			this.preferencesService.updateLang(preferences.lang);
		});
    }
}
