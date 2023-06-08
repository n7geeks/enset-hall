import { Component } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { Store } from "@ngxs/store";
import { AuthUser } from "../../authentication/models/AuthUser";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { AuthenticationActions } from "../../authentication/state/authentication.actions";
import { RouterModule } from "@angular/router";
import { UserPreferencesActions } from "../../user-preferences/state/user-preferences.actions";
import { UserPreferencesState } from "../../user-preferences/state/user-preferences.state";
import { SupportedLang, SupportedTheme } from "../../user-preferences/types";
import { MatRippleModule } from "@angular/material/core";
import { AuthenticationState } from "../../authentication/state/authentication.state";

@Component({
	selector: "n7h-header-profile-button",
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatMenuModule,
		MatIconModule,
		TranslateModule,
		RouterModule,
		MatListModule,
		NgOptimizedImage,
		MatRippleModule
	],
	template: `
		<ng-container *ngIf="user$ | async as user">
			<button
				type="button"
				mat-icon-button
				*ngIf="user.photoUrl"
				class="profile-button"
				[title]="('LOGGED_IN_AS' | translate) + ' ' + user.displayName"
				[matMenuTriggerFor]="menu"
			>
				<img
					[ngSrc]="user.photoUrl"
					[alt]="user.displayName"
					priority
					fill/>
			</button>
			<mat-menu #menu="matMenu">
				<div *ngIf="user"
				     class="user-info-container"
				     mat-menu-item
					 [title]="'PROFILE_MENU.PROFILE_TOOLTIP' | translate"
					 [routerLink]="['profiles', user.uid]">
					<div class="user-details">
						<span class="user-name">{{ user.displayName }}</span>
						<span class="user-email">{{ user.email }}</span>
					</div>
					<div
						*ngIf="user.scopes.role != 'external'"
						[title]="(user.scopes.major | uppercase) + '_TOOLTIP' | translate"
						class="chip">
						{{ user.scopes.major | uppercase }} {{ yearOfStudy$ | async }}
					</div>
					<div [class]="'chip ' + user.scopes.role"
						 *ngIf="user.scopes.role == 'external'"
						 [title]="'EXTERNAL_TOOLTIP' | translate">
						{{ "EXTERNAL" | translate }}
					</div>
				</div>
				<mat-divider></mat-divider>
				<button *ngIf="theme$ | async as theme"
						mat-menu-item (click)="toggleTheme()"
						[title]="(theme == 'light' ?
						'PROFILE_MENU.DARK_MODE_TOOLTIP' :
						'PROFILE_MENU.LIGHT_MODE_TOOLTIP') |
						translate">
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
							<path
								d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
							<path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
							<path d="M19 11h2m-1 -1v2"></path>
						</svg>
					</mat-icon>
					<span class="change-theme">
						{{ (theme == 'light' ?
						'PROFILE_MENU.DARK_MODE' :
						'PROFILE_MENU.LIGHT_MODE') |
						translate }}
					</span>
				</button>
				<button mat-menu-item
						[matMenuTriggerFor]="langMenu">
					<mat-icon>
						<svg class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
							 stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
							<path d="M3.6 9h16.8"></path>
							<path d="M3.6 15h16.8"></path>
							<path d="M11.5 3a17 17 0 0 0 0 18"></path>
							<path d="M12.5 3a17 17 0 0 1 0 18"></path>
						</svg>
					</mat-icon>
					<span class="change-language">{{ 'PROFILE_MENU.CHANGE_LANGUAGE' | translate }}</span>
				</button>
				<mat-menu #langMenu="matMenu">
					<ng-container *ngIf="lang$ | async as currentLang">
						<button mat-menu-item
								*ngFor="let language of languages"
								[disabled]="language.code === currentLang"
								[title]="language.code === currentLang ? language.activeTooltip : language.inactiveTooltip"
								(click)="changeLanguage(language.code)">
							{{ language.label }}
						</button>
					</ng-container>
				</mat-menu>
				<mat-divider></mat-divider>
				<a
					mat-menu-item
					[title]="'PROFILE_MENU.SETTINGS_TOOLTIP' | translate"
					[routerLink]="['/settings']"
				>
					<mat-icon>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
							 stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
							 stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path
								d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
							<path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
						</svg>
					</mat-icon>
					<span>{{ 'PROFILE_MENU.SETTINGS' | translate }}</span>
				</a>
				<button mat-menu-item (click)="signOut()" [title]="'PROFILE_MENU.SIGN_OUT_TOOLTIP' | translate">
					<mat-icon>
						<svg class="icon-danger" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
							 stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path
								d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
							<path d="M7 12h14l-3 -3m0 6l3 -3"></path>
						</svg>
					</mat-icon>
					<span class="sign-out-text">{{ 'PROFILE_MENU.SIGN_OUT' | translate }}</span>
				</button>
			</mat-menu>
		</ng-container>
	`,
	styles: [`
		.profile-button {
			width: 3rem;
			height: 3rem;
			border-radius: 50%;
			background-color: #fff;
			overflow: hidden;
			border: solid .2rem var(--primary);
		}
		.sign-out-text {
			color: var(--danger);
		}
		.icon {
			stroke: var(--text);
		}
		.icon-danger {
			stroke: var(--danger);
		}
		.user-info-container {
			display: flex;
			flex-direction: column;
			padding: .5rem 2rem;
		}
		.user-email, .user-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.user-email {
			font-size: .7rem;
			color: var(--secondary);
		}
		.user-name {
			font-size: .8rem;
			font-weight: bold;
			color: var(--text);
		}
		.chip {
			margin: .5rem 0;
			padding: .3rem;
			border-radius: 5rem;
			background-color: var(--primary);
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.user-details {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.user-photo {
			margin-inline-end: 1rem;
		}
		.external {
			background-color: var(--danger);
		}
	`]
})
export class HeaderProfileButtonComponent {
	constructor(private store: Store) { }
	protected yearOfStudy$ =
		this.store.select(AuthenticationState.userYearOfStudy);
	protected user$ = this.store.select<AuthUser>(state => state.authentication.user);
	protected theme$ = this.store.select<SupportedTheme>(UserPreferencesState.getTheme);
	protected lang$ = this.store.select<SupportedLang>(UserPreferencesState.getLang);
	protected languages: Array<{code: SupportedLang, label: string, inactiveTooltip: string, activeTooltip: string}> = [
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
	signOut() {
		this.store.dispatch(new AuthenticationActions.SignOut());
	}
	toggleTheme() {
		this.store.dispatch(new UserPreferencesActions.ToggleTheme());
	}

	changeLanguage(language: SupportedLang) {
		this.store.dispatch(new UserPreferencesActions.UpdateLang(language));
	}
}
