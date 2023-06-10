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
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {take} from "rxjs";
import {Store} from "@ngxs/store";
import {ClubRequestsActions} from "../requests/club-requests.actions";
import LeaveClub = ClubRequestsActions.LeaveClub;

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
		ClubActionButtonComponent
	],
	template: `
		<ng-container *ngIf="club">
			<div class="card">
				<button class="menu-toggle" mat-icon-button [matMenuTriggerFor]="menu">
					<mat-icon>more_vert</mat-icon>
				</button>
				<mat-menu #menu="matMenu">
					<button mat-menu-item>
						<mat-icon>content_copy</mat-icon>
						<span>{{ 'CLUBS.COPY_LINK' | translate }}</span>
					</button>
					<button mat-menu-item (click)="leaveClub(club)">
						<mat-icon>exit_to_app</mat-icon>
						<span>{{ 'CLUBS.LEAVE' | translate }}</span>
					</button>
				</mat-menu>

				<img class="banner" [src]="club.banner" [alt]="club.name + ' banner'" />
				<img
					class="club-logo item"
					[ngSrc]="club.logo"
					width="100"
					height="100"
					[alt]="club.name + ' logo'" />
				<h1 class="item">{{ club.name }}</h1>
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
				<h2 class="item catchphrase">{{ club.catchphrase }}</h2>
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
			}
			.item {
				z-index: 1;
			}
			.club-logo {
				display: block;
				border-radius: 50%;
				margin-inline-end: 1rem;
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

			/* Show the indicator (dot/circle) when checked */
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
	constructor(private dialog: MatDialog, private store: Store) {}
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
			.open(ConfirmLeaveDialog, {
				restoreFocus: false,
				data: club
			});
		dialogRef.afterClosed()
			.pipe(take(1))
			.subscribe(result => {
				if (result) {
					this.store.dispatch(new LeaveClub(club.id));
				}
		});
	}

}

@Component({
	selector: 'confirm-leave-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule, TranslateModule],
	template: `
		<h1 mat-dialog-title>{{ 'CLUBS.LEAVE_DIALOG_TITLE' | translate: { clubName: data.name }  }}</h1>
		<mat-dialog-content>
            {{ 'CLUBS.LEAVE_DIALOG_CONTENT' | translate: { clubName: data.name }  }}
		</mat-dialog-content>
		<mat-dialog-actions>
			<button mat-button mat-dialog-close [mat-dialog-close]="true" (click)="dialogRef.close(false)">
                {{ 'CANCEL' | translate }}
			</button>
			<button mat-raised-button [mat-dialog-close]="true" color="warn" (click)="dialogRef.close(true)">
				{{ 'LEAVE' | translate }}
			</button>
		</mat-dialog-actions>
	`,
	styles: [`
		.mat-mdc-dialog-actions {
			justify-content: flex-end;
		}
	`]
})
export class ConfirmLeaveDialog {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Club,
		public dialogRef: MatDialogRef<ConfirmLeaveDialog>
	) {}
}
