import { Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { UserPreferencesActions } from "../../user-preferences.actions";
import { SupportedLang } from "../../types";
import { UserPreferencesState } from "../../user-preferences.state";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
	selector: 'enset-hall-change-language-widget',
	template: `
		<select #languageSelector
				(change)="changeLang(languageSelector.value)">
			<option #en value="en" [selected]="(lang$ | async) === en.value">English</option>
			<option #fr value="fr" [selected]="(lang$ | async) === fr.value">Français</option>
		</select>
<!--		<mat-slide-toggle>Slide me!</mat-slide-toggle>-->
	`,
	styles: [``],
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		MatSlideToggleModule
	]
})
export class ChangeLanguageWidgetComponent {
	@Select(UserPreferencesState.getLang) lang$!: Observable<SupportedLang>;
	constructor(private store: Store) { }
	protected changeLang(selection: string) {
		if (selection.match('fr|en')) {
			this.store.dispatch(
				new UserPreferencesActions.UpdateLang(selection as SupportedLang)
			);
		}
	}
}
