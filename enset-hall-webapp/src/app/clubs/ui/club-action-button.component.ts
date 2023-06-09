import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Club} from "../club.models";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {ClubRequestsActions} from "../club/requests/club-requests.actions";
import {Store} from "@ngxs/store";
import {AuthUser} from "../../authentication/models/AuthUser";
import {of, switchMap} from "rxjs";

@Component({
	selector: "n7h-club-action-button",
	standalone: true,
	imports: [CommonModule, MatButtonModule, TranslateModule],
	template: `
		<ng-container *ngIf="(allowed$ | async)">
			<ng-container *ngIf="club">
				<button
					*ngIf="!club.isMember && club.isOpen && !club.isPending"
					mat-raised-button color="primary"
					(click)="requestJoin(club.id)">
					{{ 'CLUBS.JOIN' | translate }}
				</button>
				<button
					*ngIf="club.isPending"
					mat-raised-button
					color="warn"
					(click)="cancelJoin(club.id)"
					[title]=" 'CLUBS.PENDING_TOOLTIP' | translate ">
					{{ 'CLUBS.PENDING' | translate }}
				</button>
				<div
					class="is-member"
					*ngIf="club.isMember">
					{{ 'CLUBS.YOU_ARE_MEMBER' | translate }}
				</div>
			</ng-container>
		</ng-container>
	`,
	styles: [`
		.is-member {
			background-color: rgba(0, 0, 0, 0.2);
			padding: 1rem;
			border-radius: 10px;
			color: white;
			width: 7rem;
			height: .2rem;
			display: flex;
			text-align: center;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: .75rem;
		}
		button {
			width: 100%;
		}
	`]
})
export class ClubActionButtonComponent {
	@Input() club?: Club;
	constructor(private store: Store) {}
	allowed$ = this.store
		.select<AuthUser>(state => state.authentication.user)
		.pipe(switchMap((user) => {
			return of(user.scopes.role !== "external");
		}));
	requestJoin(id: string) {
		this.store.dispatch(new ClubRequestsActions.AddClubRequest(id));
	}
	cancelJoin(id: string) {
		this.store.dispatch(new ClubRequestsActions.CancelClubRequest(id));
	}
}
