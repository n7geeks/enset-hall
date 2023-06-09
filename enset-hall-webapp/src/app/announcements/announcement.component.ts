import {Component, Input} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Announcement} from "./announcements.models";
import {Store} from "@ngxs/store";
import {Club} from "../clubs/club.models";
import {map} from "rxjs";
import {AnnouncementClubComponent} from "./announcement-club.component";
import {MatDialog} from "@angular/material/dialog";
import {AnnouncementViewComponent} from "./announcement-view.component";

@Component({
	selector: "n7h-announcement",
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, AnnouncementClubComponent],
	template: `
		<ng-container *ngIf="announcement">
			<div
				class="announcement"
				[style.background-image]="'url(' + announcement.posterUrl + ')'"
				[style.border-color]="announcement.seen ? 'var(--tab)' : 'var(--primary)'"
				(click)="openView()"
			>
				<div class="mask"></div>
				<n7h-announcement-club [club]="club$ | async"></n7h-announcement-club>
			</div>
		</ng-container>
	`,
	styles: [`
		.announcement {
			position: relative;
			width: 135px;
			height: 190px;
			border: 3.5px solid;
			border-radius: 10px;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			cursor: pointer;
			overflow: hidden;
			.mask {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(transparent, rgba(0, 0, 0, .7));
			}
			&:hover {
				filter: brightness(1);
				transform: scale(1.01);
			}
		}
	`]
})
export class AnnouncementComponent {
	@Input() announcement: Announcement | undefined;
	club$ = this.store.select<Club[]>(state => state.clubs)
		.pipe(map(clubs =>
			clubs.find(club =>
				club.id === this.announcement?.clubId))
		);
	constructor(private store: Store, private dialog: MatDialog) {}

	openView() {
		this.dialog.open(AnnouncementViewComponent, {
			data: this.announcement,
			height: "100vh",
			width: "100vw",
			minWidth: "100vw",
		});
	}
}
