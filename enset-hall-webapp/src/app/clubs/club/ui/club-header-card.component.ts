import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Club} from "../../club.models";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {AppUser} from "../../../authentication/models/AppUser";

@Component({
	selector: "n7h-club-header-card",
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, MatButtonModule, TranslateModule],
	template: `
		<ng-container *ngIf="club">
			<div class="card">
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
				<button
					*ngIf="!club.isMember && club.isOpen"
					mat-raised-button color="primary"
					class="item action">
					{{ 'CLUBS.JOIN' | translate }}
				</button>
				<div class="item is-member" *ngIf="club.isMember">{{ 'CLUBS.YOU_ARE_MEMBER' | translate }}</div>
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
						<input type="radio" checked="checked" name="tabs" value="posts" (change)="onTabChange($event)">
						<span class="checkmark"></span>
					</label>
					<label class="tab">
						{{ 'CLUBS.ACTIVITIES' | translate }}
						<input type="radio" name="tabs" value="activities" (change)="onTabChange($event)">
						<span class="checkmark"></span>
					</label>
					<label class="tab">
						{{ 'CLUBS.MEMBERS' | translate }}
						<input type="radio" name="tabs" value="members" (change)="onTabChange($event)">
						<span class="checkmark"></span>
					</label>
					<label class="tab">
						{{ 'CLUBS.ABOUT' | translate }}
						<input type="radio" name="tabs" value="about" (change)="onTabChange($event)">
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
			width: 25rem;
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
	constructor() {}
	ngOnInit(): void {
		if (!this.club) return;
		const latestChapter = this.club.chapters.reduce((a, b) => a.year > b.year ? a : b);
		const set = new Set<AppUser>();
		latestChapter.members.forEach(member => set.add(member));
		latestChapter.officeMembers.forEach(member => set.add(member));
		this.people = Array.from(set);
		this.officeMembers = latestChapter.officeMembers;
		this.tabChange.emit('posts');
	}

	@Output() tabChange = new EventEmitter<string>();

	onTabChange(event: any) {
		const selectedTab = event.target.value;
		this.tabChange.emit(selectedTab);
	}
}
