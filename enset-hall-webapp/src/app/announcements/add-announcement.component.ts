import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common"
import {Store} from "@ngxs/store";
import {Club} from "../clubs/club.models";
import {map, take} from "rxjs";
import {AnnouncementClubComponent} from "./announcement-club.component";
import {MatIconModule} from "@angular/material/icon";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {UploadService} from "../shared/uplaod.service";
import {AnnouncementsActions} from "./announcements.actions";

@Component({
	selector: "n7h-add-announcement",
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, AnnouncementClubComponent, MatIconModule],
	template: `
		<div
			class="announcement"
			(click)="openClubSelector()"
		>
			<mat-icon>add</mat-icon>
		</div>
	`,
	styles: [`
		.announcement {
			position: relative;
			width: 135px;
			height: 190px;
			border: 3.5px solid;
			border-radius: 10px;
          	background: linear-gradient(89.84deg, rgba(9, 16, 79, 0.532) 0.12%, rgba(12, 140, 233, 0.553) 99.85%), #0C8CE9;
			cursor: pointer;
			overflow: hidden;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			&:hover {
				filter: brightness(1);
				transform: scale(1.01);
			}
		}
	`]
})
export class AddAnnouncementComponent {

	constructor(
		private bottomSheet: MatBottomSheet,
		private uploadService: UploadService,
		private store: Store
	) {}

	openClubSelector() {
		const ref = this.bottomSheet.open(ClubsSelectorBottomSheet);
		ref.afterDismissed()
			.pipe(take(1))
			.subscribe(club => {
				if (!club) return;
				this.uploadService.selectImageAndUpload(url => {
					this.store.dispatch(new AnnouncementsActions.AddAnnouncement({
						clubId: club.id,
						posterUrl: url,
						viewersCount: 0,
						likesCount: 0,
						expiresAt: new Date().getTime() + 1000 * 60 * 60 * 24 * 2
					}));
				});
		});
	}
}

@Component({
	selector: "n7h-clubs-selector",
	standalone: true,
	imports: [CommonModule, MatIconModule, MatListModule, NgOptimizedImage],
	template: `
		<ul>
			<li *ngFor="let club of clubs$ | async" (click)="select(club)">
                <img
	                [ngSrc]="club.logo"
	                [alt]="club.name"
	                width="50"
	                height="50"
                >
				<span>{{club.name}}</span>
			</li>
		</ul>
	`,
	styles: [`
	  :host {
	    padding: 0;
      }
	  ul {
        display: flex;
	    flex-direction: column;
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
	    gap: 1rem;
      }
      li {
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 1rem;
		&:hover {
	        filter: brightness(1.1);
        }
        img {
          margin-right: 10px;
          border-radius: 50%;
        }
      }
	`]
})
export class ClubsSelectorBottomSheet {
	constructor(
		private store: Store,
		public ref: MatBottomSheet
	) {
	}
	clubs$ = this.store
		.select<Club[]>(state => state.clubs)
		.pipe(map(clubs => clubs
			.filter(club => club.isOfficeMember || club.isGodfather)));

	select(club: Club) {
		this.ref.dismiss(club);
	}
}