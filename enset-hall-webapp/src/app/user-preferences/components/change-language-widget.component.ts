import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { UserPreferencesActions } from "../user-preferences.actions";
import { SupportedLang } from "../types";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

@Component({
	selector: 'enset-hall-change-language-widget',
	template: `
        <button mat-fab
                extended
                color="background"
                [matMenuTriggerFor]="menu">
            <mat-icon>language</mat-icon>
			<span>
            	{{ 'CHANGE_LANGUAGE' | translate }}
			</span>
        </button>
		<mat-menu #menu="matMenu">
            <button *ngFor="let lang of langs"
                    mat-menu-item
            		(click)="changeLang(lang.code)">
                <span>{{ lang.label }}</span>
            </button>
		</mat-menu>
	`,
	styles: [`
		mat-icon, span {
			color: var(--primary);
		}
	`],
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		MatSlideToggleModule,
		MatButtonModule,
		MatMenuModule,
		MatIconModule
	]
})
export class ChangeLanguageWidgetComponent {
	protected langs: {
		code: SupportedLang;
		label: string;
	}[] = [
		{ code: 'en', label: 'English' },
		{ code: 'fr', label: 'Français' }
	];
	constructor(private store: Store) { }
	protected changeLang(selection: string) {
		if (selection.match('fr|en')) {
			this.store.dispatch(
				new UserPreferencesActions.UpdateLang(selection as SupportedLang)
			);
		}
	}
}
