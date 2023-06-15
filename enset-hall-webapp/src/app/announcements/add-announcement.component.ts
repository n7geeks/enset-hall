import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common"
import {Store} from "@ngxs/store";
import {take} from "rxjs";
import {AnnouncementClubComponent} from "./announcement-club.component";
import {MatIconModule} from "@angular/material/icon";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {UploadService} from "../shared/uplaod.service";
import {AnnouncementsActions} from "./announcements.actions";
import {ClubsSelectorBottomSheet} from "../clubs/club/bottom-sheets/club-selector.bottom-sheet";

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

