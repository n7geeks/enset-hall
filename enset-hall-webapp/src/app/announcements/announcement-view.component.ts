import {AfterViewInit, Component, Inject} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Announcement} from "./announcements.models";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HeaderAppBrandingComponent} from "../header/ui/header-app-branding.component";
import {TranslateModule} from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import {AnnouncementsActions} from "./announcements.actions";

@Component({
	selector: "n7h-announcement-view",
	standalone: true,
	imports: [CommonModule, TranslateModule, MatButtonModule, MatIconModule, HeaderAppBrandingComponent, NgOptimizedImage],
	template: `
		<button mat-icon-button class="close" color="warn" (click)="close()">
			<mat-icon>close</mat-icon>
		</button>
		<n7h-header-app-branding></n7h-header-app-branding>
		<div
			class="view"
		>
			<div class="mask"></div>
			<img [ngSrc]="data.posterUrl" alt="" fill="fill" />
		</div>
		<div class="views">
			<mat-icon>
				visibility
			</mat-icon>
			{{ 'ANNOUNCEMENT.VIEWS_COUNT' | translate: { count: data.viewersCount } }}
		</div>
		<div class="likes">
			<button mat-icon-button color="warn" (click)="heart()">
				<mat-icon *ngIf="!data.liked; else liked">
					favorite_outline
				</mat-icon>
				<ng-template #liked>
					<mat-icon>
						favorite
					</mat-icon>
				</ng-template>
			</button>
			{{ 'ANNOUNCEMENT.LIKES_COUNT' | translate: { count: data.likesCount } }}
		</div>
	`,
	styles: [`
		:host {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			.likes {
				position: absolute;
				bottom: 1rem;
				right: 1rem;
				z-index: 1;
				font-size: 1rem;
				font-weight: 600;
				color: var(--text);
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 1rem;
			}
			.views {
				position: absolute;
				bottom: 1rem;
				left: 1rem;
				z-index: 1;
				font-size: 1rem;
				font-weight: 600;
				color: var(--text);
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 1rem;
			}
			.close {
				position: absolute;
				top: .5rem;
				right: .5rem;
				z-index: 1;
			}
			n7h-header-app-branding {
				position: absolute;
				top: 1rem;
				left: 1rem;
				z-index: 1;
				scale: .9;
				user-focus: none;
				user-select: none;
				filter: grayscale(100%);
			}
			.view {
				position: relative;
				height: 90%;
				aspect-ratio: 1 / 1.4142;
				border-radius: 1rem;
				overflow: hidden;
				.mask {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: linear-gradient(transparent, var(--tab));
				}
				img {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}
		}
	`]
})
export class AnnouncementViewComponent implements AfterViewInit {
	constructor(
		private store: Store,
		public dialogRef: MatDialogRef<AnnouncementViewComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Announcement) {}

	close() {
		this.dialogRef.close();
	}

	heart() {
		this.data.liked = !this.data.liked;
		if (this.data.liked) {
			this.data.likesCount++;
			this.store.dispatch(new AnnouncementsActions.SetAnnouncementLiked(this.data.id));
		} else {
			this.data.likesCount--;
			this.store.dispatch(new AnnouncementsActions.SetAnnouncementUnliked(this.data.id));
		}
	}

	ngAfterViewInit(): void {
		if (this.data.seen) return;
		this.store.dispatch(new AnnouncementsActions.SetAnnouncementSeen(this.data.id));
		this.data.seen = true;
		this.data.viewersCount++;
	}
}
