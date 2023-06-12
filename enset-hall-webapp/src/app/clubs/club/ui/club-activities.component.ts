import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Club, ClubChapter} from "../../club.models";
import {ClubChaptersComponent} from "./club-chapters.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {MatRippleModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { AddActivityBottomSheet } from "../bottom-sheets/new-activity-bottom-sheet.component";

@Component({
	selector: "n7h-club-activities",
	standalone: true,
	imports: [
		CommonModule,
		ClubChaptersComponent,
		MatBottomSheetModule,
		TranslateModule,
		MatCardModule,
		MatRippleModule,
		MatButtonModule,
		MatIconModule
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
			<button
				*ngIf="club.isOfficeMember"
				(click)="addActivity()"
				[title]=" 'CLUBS.ADD_ACTIVITY_TOOLTIP' | translate "
				class="add-activity"
				mat-fab color="primary">
				<mat-icon>add</mat-icon>
			</button>
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
		.add-activity {
			position: fixed;
			bottom: 1rem;
			right: 1rem;
		}
	`]
})
export class ClubActivitiesComponent {
	constructor(private bottomSheet: MatBottomSheet) {}
	@Input() club!: Club;
	chapter?: ClubChapter;
	onChapterChange($event: ClubChapter) {
		this.chapter = $event;
	}
	addActivity() {
		this.bottomSheet.open(AddActivityBottomSheet);
	}
}