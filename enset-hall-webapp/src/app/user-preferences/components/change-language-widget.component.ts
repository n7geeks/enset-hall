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
import { UserPreferencesState } from "../user-preferences.state";
import { Observable } from "rxjs";

interface LangSelectorMenuItem {
	code: SupportedLang;
	label: string;
	inactiveTooltip: string;
	activeTooltip: string;
}

@Component({
	selector: 'enset-hall-change-language-widget',
	template: `
        <button mat-fab
                extended
                [title]="'CHANGE_LANGUAGE_TOOLTIP' | translate"
                color="background"
                [matMenuTriggerFor]="menu">
            <mat-icon>language</mat-icon>
			<span>
            	{{ 'CHANGE_LANGUAGE' | translate }}
			</span>
        </button>
		<mat-menu #menu="matMenu">
			<ng-container *ngIf="currentLang$ | async as currentLang">
	            <button *ngFor="let lang of langs"
	                    mat-menu-item
	                    [disabled]="lang.code === currentLang"
	                    (click)="changeLang(lang.code)"
	                    [title]="lang.code === currentLang ? lang.activeTooltip : lang.inactiveTooltip">
	                <span>{{ lang.label }}</span>
	            </button>
			</ng-container>
		</mat-menu>
	`,
	styles: [`
		mat-icon, span {
			color: var(--primary);
		}
		.active-lang {
			cursor: not-allowed;
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
	protected langs: LangSelectorMenuItem[] = [
		{
			code: 'en',
			label: 'English',
			inactiveTooltip: 'Switch to english',
			activeTooltip: 'English is already selected'
		},
		{
			code: 'fr',
			label: 'Français',
			inactiveTooltip: 'Basculer en français',
			activeTooltip: 'Français est déjà sélectionné'
		}
	];
	protected currentLang$: Observable<SupportedLang>
		= this.store.select(UserPreferencesState.getLang);
	constructor(private store: Store) { }
	protected changeLang(selection: string) {
		if (selection.match('fr|en')) {
			this.store.dispatch(
				new UserPreferencesActions.UpdateLang(selection as SupportedLang)
			);
		}
	}
}
