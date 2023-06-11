import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {Club} from "../../club.models";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {AppUser} from "../../../authentication/models/AppUser";
import {RouterLink} from "@angular/router";
import {ClubActionButtonComponent} from "../../ui/club-action-button.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {take} from "rxjs";
import {Store} from "@ngxs/store";
import {ClubRequestsActions} from "../requests/club-requests.actions";
import LeaveClub = ClubRequestsActions.LeaveClub;
import {ImageViewerService} from "../../../shared/image-viewer.service";
import { ClubConfirmDialog } from "../dialogs/club-confirm.dialog";
import {ClubNewNameDialogData, ClubRenameDialog} from "../dialogs/club-rename.dialog";
import {UploadService} from "../../../shared/uplaod.service";
import {MatRippleModule} from "@angular/material/core";

@Component({
	selector: "n7h-club-header-card",
	standalone: true,
	imports: [
		CommonModule,
		NgOptimizedImage,
		MatButtonModule,
		TranslateModule,
		RouterLink,
		MatIconModule,
		MatMenuModule,
		ClubActionButtonComponent,
		MatRippleModule
	],
	template: `
		<ng-container *ngIf="club">
			<div class="card">
				<button class="menu-toggle" mat-icon-button [matMenuTriggerFor]="menu">
					<mat-icon>more_vert</mat-icon>
				</button>
				<mat-menu #menu="matMenu">
					<button mat-menu-item
							(click)="changeBanner(club.id)"
							*ngIf="club.isOfficeMember || club.isGodfather">
						<mat-icon>
							<svg viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
								 stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M15 8h.01"></path>
								<path
									d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"></path>
								<path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path>
								<path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"></path>
							</svg>
						</mat-icon>
						<span>{{ 'CLUBS.CHANGE_BANNER' | translate }}</span>
					</button>
					<button mat-menu-item (click)="copyLink(club.handle)">
						<mat-icon>content_copy</mat-icon>
						<span>{{ 'CLUBS.COPY_LINK' | translate }}</span>
					</button>
					<button mat-menu-item (click)="leaveClub(club)">
						<mat-icon>exit_to_app</mat-icon>
						<span>{{ 'CLUBS.LEAVE' | translate }}</span>
					</button>
				</mat-menu>

				<img
					matRipple
					class="banner"
					[src]="club.banner"
					(click)="imageService.view(club.banner)"
					[alt]="club.name + ' banner'"/>
				<div
					(click)="imageService.view(club.logo)"
					class="club-logo item"
					matRipple
					[style.background-image]="'url(' + club.logo + ')'">
					<button
						mat-mini-fab
						color="primary"
						(click)="$event.stopPropagation();changeLogo(club.id)"
						*ngIf="club.isOfficeMember || club.isGodfather">
						<mat-icon>
							<svg viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
								 stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M15 8h.01"></path>
								<path
									d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"></path>
								<path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path>
								<path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"></path>
							</svg>
						</mat-icon>
					</button>
				</div>
				<h1
					class="item"
					[ngClass]="(club.isOfficeMember || club.isGodfather) ? 'text-item' : ''">
					{{ club.name }}
					<button
						mat-icon-button
						(click)="editName(club)"
						*ngIf="club.isOfficeMember || club.isGodfather"
					>
						<mat-icon>edit</mat-icon>
					</button>
				</h1>
				<img
					class="item"
					*ngIf="club.isAdeClub"
					alt="Ade icon"
					ngSrc="../../../../assets/vectors/ade-icon.svg"
					width="40"
					height="40"
				/>
				<div class="spacer"></div>
				<n7h-club-action-button class="item action" [club]="club"></n7h-club-action-button>
				<h2 class="item catchphrase" [ngClass]="(club.isOfficeMember || club.isGodfather) ? 'text-item catchphrase-edit' : ''">
					{{ club.catchphrase }}
					<button
						mat-icon-button
						(click)="editCatchphrase(club)"
						*ngIf="club.isOfficeMember || club.isGodfather"
					>
						<mat-icon>edit</mat-icon>
					</button>
				</h2>
				<div class="item index chapters">
					<p>{{ 'CLUBS.CHAPTERS' | translate }}</p>
					<div class="spacer"></div>
					<p>{{ club.chapters.length }}</p>
				</div>
				<div class="item index office-members">
					<p>{{ 'CLUBS.OFFICE_MEMBERS' | translate }}</p>
					<div class="spacer"></div>
					<p>{{ officeMembers.length }}</p>
				</div>
				<div class="item index members">
					<p>{{ 'CLUBS.MEMBERS' | translate }}</p>
					<div class="spacer"></div>
					<p>{{ people.length }}</p>
				</div>
				<div class="tabs-container item">
					<label class="tab">
						{{ 'CLUBS.POSTS' | translate }}
						<input
							type="radio"
							[checked]="tab === 'posts'"
							name="tabs" value="posts"
							(change)="onTabChange($event)">
						<span class="checkmark"></span>
					</label>
					<label class="tab">
						{{ 'CLUBS.ACTIVITIES' | translate }}
						<input
							type="radio"
							[checked]="tab === 'activities'"
							name="tabs"
							value="activities"
							(change)="onTabChange($event)">
						<span class="checkmark"></span>
					</label>
					<label class="tab">
						{{ 'CLUBS.MEMBERS' | translate }}
						<input
							type="radio"
							name="tabs"
							[checked]="tab === 'members'"
							value="members"
							(change)="onTabChange($event)">
						<span class="checkmark"></span>
					</label>
					<label class="tab">
						{{ 'CLUBS.ABOUT' | translate }}
						<input
							type="radio"
							name="tabs"
							[checked]="tab === 'about'"
							value="about"
							(change)="onTabChange($event)">
						<span class="checkmark"></span>
					</label>
					<label class="tab" *ngIf="club.isOfficeMember">
						{{ 'CLUBS.REQUESTS' | translate }}
						<input
							type="radio"
							name="tabs"
							[checked]="tab === 'requests'"
							value="requests"
							(change)="onTabChange($event)">
						<span class="checkmark"></span>
					</label>
				</div>
			</div>
		</ng-container>
	`,
	styles: [`

		.text-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			button {
				display: none;
				transition: display .5s ease-in-out;
			}
			&:hover {
				button {
					display: block;
				}
			}
		}
		.is-member {
			background-color: var(--tab);
			padding: 1rem;
			border-radius: 10px;
			color: var(--text);
			width: 12rem;
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
		.card {
			width: calc(1040px - 4rem);
			height: 300px;
			border-radius: 10px;
			background-color: var(--highlight);
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
			position: relative;
			margin-top: 3rem;
			padding: 0 2rem;
			display: flex;
			align-items: center;
			overflow: hidden;
			.menu-toggle {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 2;
			}
			.banner {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 150px;
				object-fit: cover;
				border-radius: 10px;
				-webkit-user-drag: none;
				cursor: pointer;
				transition: scale 0.2s ease-in-out;
				&:hover {
					scale: 1.02;
				}
			}
			.item {
				z-index: 1;
			}
			.club-logo {
				display: flex;
				border-radius: 50%;
				margin-inline-end: 1rem;
				width: 100px;
				height: 100px;
				-webkit-user-drag: none;
				z-index: 1;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				overflow: hidden;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				transition: scale 0.2s ease-in-out;
				button {
					display: none;
				}
				&:hover {
					scale: 1.02;
					button {
						display: block;
					}
				}
			}
			h1 {
				font-size: 2rem;
				color: white;
				filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
				margin-inline-end: .5rem;
			}
			.action {
				width: 7.5rem;
			}
        }
		.catchphrase {
			font-size: 1.2rem;
			font-weight: 300;
			position: absolute;
			bottom: 83px;
			left: 150px;
		}
		.catchphrase-edit {
			&:hover {
				bottom: 74px;
			}
		}

		.index {
			position: absolute;
			right: 1rem;
			display: flex;
			padding: 1rem;
			height: .2rem;
			width: 10rem;
			border-radius: 10px;
			background-color: var(--tab);
			justify-content: center;
			align-items: center;
			margin-bottom: .5rem;
		}
		.members {
			bottom: 0;
		}
		.office-members {
			bottom: 2.5rem;
		}
		.chapters {
			bottom: 5rem;
		}

		.tabs-container {
			position: absolute;
			bottom: 0;
			left: 2rem;
			display: flex;
			width: 30rem;
			justify-content: space-between;
			.tab {
				display: flex;
				position: relative;
				justify-content: center;
				cursor: pointer;
				font-size: 1rem;
				width: 100%;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
				padding-bottom: .9rem;
			}

			.tab input {
				position: absolute;
				opacity: 0;
				cursor: pointer;
				height: 0;
				width: 0;
			}

			.checkmark {
				position: absolute;
				bottom: 0;
				left: 0;
				height: 4px;
				width: 100%;
				transition: 0.2s ease;
				border-radius: 10px;
			}

			.tab:hover input ~ .checkmark {
				background-color: var(--tab);
			}

			.tab input:checked ~ .checkmark {
				background-color: var(--primary);
			}

			.checkmark:after {
				content: "";
				position: absolute;
				display: none;
			}

			.tab input:checked ~ .checkmark:after {
				display: block;
			}
		}

	`]
})
export class ClubHeaderCardComponent implements OnInit {
	@Input() club?: Club
	people: AppUser[] = [];
	officeMembers: AppUser[] = [];
	@Input() tab: string = 'posts';
	constructor(
		public imageService: ImageViewerService,
		public upload: UploadService,
		private dialog: MatDialog,
		private store: Store) {}
	ngOnInit(): void {
		if (!this.club) return;
		const latestChapter = this.club.chapters.reduce((a, b) => a.year > b.year ? a : b);
		const set = new Set<AppUser>();
		latestChapter.members.forEach(member => set.add(member));
		latestChapter.officeMembers.forEach(member => set.add(member));
		this.people = Array.from(set);
		this.officeMembers = latestChapter.officeMembers;
	}

	@Output() tabChange = new EventEmitter<string>();

	onTabChange(event: any) {
		const selectedTab = event.target.value;
		this.tabChange.emit(selectedTab);
	}

	leaveClub(club: Club) {
		const dialogRef = this.dialog
			.open(ClubConfirmDialog, {
				restoreFocus: false,
				data: {
					club: club,
					action: 'LEAVE',
					title: 'CLUBS.LEAVE_DIALOG_TITLE',
					content: 'CLUBS.LEAVE_DIALOG_CONTENT',
					severity: 'warn'
				}
			});
		dialogRef.afterClosed()
			.pipe(take(1))
			.subscribe(result => {
				if (result) {
					this.store.dispatch(new LeaveClub(club.id));
				}
		});
	}

	changeLogo(clubId: string) {
		this.upload.selectImageAndUpload();
	}

	editName(club: Club) {
		const ref = this.dialog.open(ClubRenameDialog, {
			restoreFocus: false,
			data: <ClubNewNameDialogData>{
				club: club,
				target: 'name'
			},
		});
		ref.afterClosed()
			.pipe(take(1))
			.subscribe((result: {newName?:string,resolved:boolean}) => {
				if (result.resolved && result.newName) {
					this.store.dispatch(new ClubRequestsActions.RenameClub(club.id, result.newName));
				}
			});
	}

	editCatchphrase(club: Club) {
		const ref = this.dialog.open(ClubRenameDialog, {
			restoreFocus: false,
			data: <ClubNewNameDialogData>{
				club: club,
				target: 'catchphrase'
			},
		});
		ref.afterClosed()
			.pipe(take(1))
			.subscribe((result: {newName?:string,resolved?:boolean}) => {
				if (result?.resolved && result.newName) {
					this.store.dispatch(new ClubRequestsActions.ChangeClubCatchphrase(club.id, result.newName));
				}
			});
	}

	changeBanner(id: string) {
		// TODO Change banner logic
	}

	copyLink(handle: string) {
		const baseUrl = window.location.origin;
		const url = `${baseUrl}/clubs/${handle}`;
		navigator.clipboard.writeText(url);
	}
}


