import {Component, Input} from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {Stand} from "./stands.models";
import {ActiveStandComponent} from "./active-stand.component";
import {Store} from "@ngxs/store";
import {map} from "rxjs";

@Component({
	selector: 'n7h-club-active-stands',
	standalone: true,
	imports: [CommonModule, TranslateModule, MatIconModule, ActiveStandComponent],
	template: `
		<ng-container *ngIf="stands$ | async as stands">
			<h3 *ngIf="stands.length > 0">
				<mat-icon>
					<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M3 21l18 0"></path>
						<path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"></path>
						<path d="M5 21l0 -10.15"></path>
						<path d="M19 21l0 -10.15"></path>
						<path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"></path>
					</svg>
				</mat-icon>
				{{ 'ACTIVE_STANDS' | translate }}
			</h3>
			<div class="active-stands">
				<n7h-active-stand *ngFor="let stand of stands" [stand]="stand"></n7h-active-stand>
			</div>
        </ng-container>
	`,
	styles: [`
		h3 {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
		.active-stands {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			margin: 1rem 0;
			padding: 0 .5rem;
		}

	`]
})
export class ClubActiveStandsComponent {
	@Input() clubId!: string;
	constructor(private store: Store) {}
	stands$ = this.store.
	select<Stand[]>(state => state.stands).
	pipe(map(stands => stands.
	filter(stand => stand.clubId === this.clubId)))
}
