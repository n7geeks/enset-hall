import {Component, Input, OnInit} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Club} from "../../club.models";
import {TranslateModule} from "@ngx-translate/core";
import {Store} from "@ngxs/store";
import {ClubRequestsActions} from "../requests/club-requests.actions";
import {ClubRequest, ClubRequestsStateModel} from "../requests/club-requests.models";
import {map, Observable} from "rxjs";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {Scope} from "../../../scopes/scopes.models";
import {MatButtonModule} from "@angular/material/button";

@Component({
	selector: "n7h-club-requests",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		MatListModule,
		MatCardModule,
		RouterLink,
		NgOptimizedImage,
		MatButtonModule
	],
	template: `
		<ng-container *ngIf="club">
			<h2>{{ "CLUBS.REQUESTS" | translate }}</h2>
			<ul *ngIf="((requests$ | async)?.length || 0) > 0; else noRequests">
				<li *ngFor="let request of requests$ | async">
					<a [routerLink]="'../../../profiles/' + request.requesterId">
						<img
							[ngSrc]="request.requester?.photoUrl || 'assets/images/default-profile.png'"
							width="100"
							height="100"
							alt="{{ request.requester?.displayName }}"
						/>
						<span>
							<h2>{{ request.requester?.displayName }}</h2>
							<p>{{ request.requester?.email }}</p>
						</span>
					</a>
					<div class="actions">
						<button mat-raised-button color="primary" (click)="accept(request.id)">
							{{ "CLUB_REQUEST.ACCEPT" | translate }}
						</button>
						<button mat-raised-button color="warn" (click)="reject(request.id)">
							{{ "CLUB_REQUEST.REJECT" | translate }}
						</button>
					</div>
				</li>
			</ul>
			<ng-template #noRequests>
				<p>{{ "CLUB_REQUEST.NO_REQUESTS" | translate }}</p>
			</ng-template>
		</ng-container>
	`,
	styles: [`
		ul {
			display: flex;
			flex-direction: column;
			justify-content: start;
			list-style: none;
			padding: 0;
			margin: 0 0 2rem 0;
			gap: 1rem;
			width: calc(100% - 6rem);
			li {
				width: 100%;
				background: var(--highlight);
				border-radius: 10px;
				padding: 1.5rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				.actions {
					display: flex;
					height: 100%;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 1rem;
					width: 10rem;
					button {
						width: 100%;
					}
				}
				a {
					border-radius: 10px;
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					text-decoration: none;
					gap: 2rem;
					span {
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: center;
						color: var(--text);
						h2 {
							margin: 0;
							font-size: 1.2rem;
						}
						p {
							margin: 0;
							font-size: 0.8rem;
						}
					}
				}
            }

		}
		img {
			border-radius: 50%;
			border: 5px solid var(--primary);
		}
	`]
})
export class ClubRequestsComponent implements OnInit {
	constructor(private store: Store) {}
	@Input() club?: Club;
	requests$: Observable<ClubRequest[]> = this.store
		.select<ClubRequestsStateModel>(state => state.clubRequests)
		.pipe(map(requests => {
			if (!this.club) return [];
			return requests[this.club.id];
		}));
	scopes$ = this.store.select<Scope[]>(state => state.scopes);
	ngOnInit(): void {
		if (!this.club) return;
		this.store.dispatch(new ClubRequestsActions.GetClubRequests(this.club.id));
	}

	reject(requestId: string) {
		this.store.dispatch(new ClubRequestsActions.RejectClubRequest(requestId));
	}
	accept(requestId: string) {
		this.store.dispatch(new ClubRequestsActions.AcceptClubRequest(requestId));
	}
}
