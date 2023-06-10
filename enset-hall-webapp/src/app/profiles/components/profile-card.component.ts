import {Component, Input} from "@angular/core";
import {AppUser} from "../../authentication/models/AppUser";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {AuthenticationState} from "../../authentication/state/authentication.state";
import {Store} from "@ngxs/store";
import {ScopesState} from "../../scopes/scopes.state";
import {Scope} from "../../scopes/scopes.models";
import {map, Observable} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AuthUser} from "../../authentication/models/AuthUser";
import {ImageViewerService} from "../../shared/image-viewer.service";

@Component({
	selector: "n7h-profile-card",
	standalone: true,
	imports: [
		NgOptimizedImage,
		CommonModule,
		TranslateModule,
		MatButtonModule,
		MatIconModule
	],
	template: `
		<div class="card" *ngIf="profile">
			<img
				[ngSrc]="profile.photoUrl"
				[alt]="profile.displayName"
				(click)="imageViewer.view(profile.photoUrl)"
				width="120"
				height="120"/>
			<h2>{{profile.displayName}}</h2>
			<p>{{profile.email}}</p>
			<ng-container *ngIf="scope$ | async as scope">
				<div
					*ngIf="scope.role != 'external'"
					[title]="(scope.major | uppercase) + '_TOOLTIP' | translate"
					class="chip">
					{{ scope.major | uppercase }}
				</div>
				<div [class]="'chip ' + scope.role"
					 *ngIf="scope.role == 'external'"
					 [title]="'EXTERNAL_TOOLTIP' | translate">
					{{ "EXTERNAL" | translate }}
				</div>
			</ng-container>
			<div class="spacer"></div>
			<div class="actions">
				<button *ngIf="!(isMe$ | async)" mat-icon-button
						[title]="'ACTIONS.CHAT_TOOLTIP' | translate: {name: profile.displayName}">
					<mat-icon>
						<svg viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
							 stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"></path>
							<path d="M12 11l0 .01"></path>
							<path d="M8 11l0 .01"></path>
							<path d="M16 11l0 .01"></path>
						</svg>
					</mat-icon>
				</button>
				<button *ngIf="isMe$ | async" mat-icon-button>
					<mat-icon>
						edit
					</mat-icon>
				</button>
				<button mat-icon-button>
					<mat-icon>more_vert</mat-icon>
				</button>
			</div>
		</div>
	`,
	styles: [`
		.actions {
			display: flex;
			justify-content: flex-end;
			width: 100%;
		}
		.chip {
			margin: .5rem 0;
			padding: .5rem 2rem;
			border-radius: 5rem;
			background-color: var(--primary);
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			user-select: none;
			-webkit-user-drag: none;
		}
		.external {
			background-color: var(--danger);
		}
		.card {
			display: flex;
			flex-direction: column;
			width: 40rem;
			min-height: 20rem;
			background-color: var(--highlight);
			box-shadow: 0 0 1rem 0.5rem rgb(0 0 0 / 10%);
			border-radius: 1rem;
			align-items: center;
			margin-top: 4rem;
			img {
				border-radius: 50%;
				margin: -3rem;
				border: .5rem solid var(--primary);
				box-shadow: 0 0 1rem 0.5rem rgb(0 0 0 / 10%);
				cursor: pointer;
				transition: scale .2s ease-in-out;
				&:hover {
					scale: 1.02;
				}
			}
			h2 {
				margin-top: 5rem;
			}
			p {
				margin-top: -1rem;
			}
		}
	`]
})
export class ProfileCardComponent {
	@Input() profile?: AppUser;
	isMe$: Observable<boolean>;
	protected yearOfStudy$ =
		this.store.select(AuthenticationState.userYearOfStudy);
	scope$ = this.store.select<Scope[]>(ScopesState)
		.pipe(map(scopes => {
			if (!this.profile) {
				return undefined;
			}
			const scopeId = this.profile.scope_id;
			return scopes.find(scope => scope.id === scopeId);
		}));
	constructor(private store: Store, public imageViewer: ImageViewerService) {
		this.isMe$ = this.store
			.select<AuthUser>(state => state.authentication.user)
			.pipe(map(user => user?.uid === this.profile?.id));
	}
}
