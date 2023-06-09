import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Club, ClubChapter} from "../../club.models";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@Component({
	selector: "n7h-club-chapters",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		NgOptimizedImage,
		RouterLink,
		MatButtonToggleModule
	],
	template: `
		<div class="container" *ngIf="club">
			<div class="chapter-selector">
				<h3>{{ 'CLUBS.CHAPTER' | translate }}</h3>
				<div class="spacer"></div>
				<mat-button-toggle-group name="chapters" (valueChange)="setChapter($event)">
					<mat-button-toggle
						*ngFor="let chapter of club.chapters"
						[value]="chapter"
						[checked]="chapter.year === selectedChapter?.year">
						{{ chapter.year }}
					</mat-button-toggle>
				</mat-button-toggle-group>
			</div>
			<ng-content></ng-content>
		</div>
	`,
	styles: [`
		.chapter-selector {
			display: flex;
			align-items: center;
			width: calc(1040px - 2rem);
			margin: 1rem 0;
			padding: 1rem;
			border-radius: 10px;
			background: var(--highlight);
		}
		.container {
			width: 90%;
			margin-bottom: 2rem;
		}
	`]
})
export class ClubChaptersComponent implements OnInit {
	constructor() {}
	@Input() club?: Club;
	selectedChapter?: ClubChapter;
	@Output() chapterChange: EventEmitter<ClubChapter> = new EventEmitter<ClubChapter>();

	ngOnInit(): void {
		if (this.club) {
			this.selectedChapter = this.club.chapters
				.sort((a, b) => b.year - a.year)[0];
			this.chapterChange.emit(this.selectedChapter);
		}
	}

	setChapter(event: ClubChapter | undefined): void {
		if (!event) {
			return;
		}
		this.selectedChapter = event;
		this.chapterChange.emit(event);
	}
}
