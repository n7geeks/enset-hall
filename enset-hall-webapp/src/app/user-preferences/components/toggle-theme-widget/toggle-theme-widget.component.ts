import { Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { UserPreferencesActions } from "../../user-preferences.actions";
import { SupportedTheme } from "../../types";
import { UserPreferencesState } from "../../user-preferences.state";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
	selector: 'enset-hall-toggle-theme-widget',
	template: `
        <button *ngIf="(theme$ | async) as theme"
                [title]="(theme === 'light' ? 'SWITCH_TO_DARK_MODE' : 'SWITCH_TO_LIGHT_MODE') | translate"
                mat-fab
                color="background"
                aria-label="Toggle Theme Widget"
                (click)="toggleTheme()">
            <mat-icon>
                <svg *ngIf="theme === 'dark'"
                     xmlns="http://www.w3.org/2000/svg"
                     class="icon"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     stroke-width="2"
                     fill="none"
                     stroke-linecap="round"
                     stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"></path>
                    <path d="M6.343 17.657l-1.414 1.414"></path>
                    <path d="M6.343 6.343l-1.414 -1.414"></path>
                    <path d="M17.657 6.343l1.414 -1.414"></path>
                    <path d="M17.657 17.657l1.414 1.414"></path>
                    <path d="M4 12h-2"></path>
                    <path d="M12 4v-2"></path>
                    <path d="M20 12h2"></path>
                    <path d="M12 20v2"></path>
                </svg>
                <svg *ngIf="theme === 'light'"
                     xmlns="http://www.w3.org/2000/svg"
                     class="icon"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     stroke-width="2"
                     fill="none"
                     stroke-linecap="round"
                     stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                    <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
                    <path d="M19 11h2m-1 -1v2"></path>
                </svg>
            </mat-icon>
        </button>
	`,
	styles: [`
		.icon {
			stroke: var(--primary);
		}
	`],
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		MatButtonModule,
		MatIconModule
	]
})
export class ToggleThemeWidgetComponent {
	@Select(UserPreferencesState.getTheme) theme$!: Observable<SupportedTheme>;
	constructor(private store: Store) { }
	protected toggleTheme() {
		this.store.dispatch(new UserPreferencesActions.ToggleTheme());
	}
}
