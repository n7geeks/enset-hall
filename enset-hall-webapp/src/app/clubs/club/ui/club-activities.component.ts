import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Club, ClubChapter} from "../../club.models";
import {ClubChaptersComponent} from "./club-chapters.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {MatRippleModule} from "@angular/material/core";

@Component({
	selector: "n7h-club-activities",
	standalone: true,
	imports: [
		CommonModule,
		ClubChaptersComponent,
		TranslateModule,
		MatCardModule,
		MatRippleModule
	],
	template: `
		<n7h-club-chapters (chapterChange)="onChapterChange($event)" [club]="club">
			<h2>{{ 'CLUBS.ACTIVITIES' | translate }}</h2>
			<ul>
				<li class="activity" *ngFor="let activity of chapter?.activities">
					<mat-card matRipple>
						<mat-card-subtitle>{{ activity.type | uppercase | translate }}</mat-card-subtitle>
						<mat-card-content>
							<h3>{{ activity.title }}</h3>
							<p>{{ activity.description }}</p>
						</mat-card-content>
						<mat-card-actions>
							{{ activity.startDate | date: 'mediumDate' }}
							-
							{{ activity.startDate | date: 'shortTime' }}
							→
							{{ activity.endDate | date: 'shortTime' }}
						</mat-card-actions>
					</mat-card>
				</li>
			</ul>
		</n7h-club-chapters>
	`,
	styles: [`
		ul {
			list-style: none;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
			padding: 0;
		}
		mat-card {
			background-color: var(--highlight);
			transition: scale 0.2s ease-in-out;
			padding: 1rem;
			&:hover {
				scale: 1.01;
			}
		}
	`]
})
export class ClubActivitiesComponent {
	constructor() {}
	@Input() club!: Club;
	chapter?: ClubChapter;
	onChapterChange($event: ClubChapter) {
		this.chapter = $event;
	}
}
