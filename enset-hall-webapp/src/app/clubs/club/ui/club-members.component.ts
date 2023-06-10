import {Component, Input} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Club, ClubChapter} from "../../club.models";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ClubChaptersComponent} from "./club-chapters.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@Component({
	selector: "n7h-club-members",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		NgOptimizedImage,
		RouterLink,
		MatButtonToggleModule,
		ClubChaptersComponent,
		MatButtonModule,
		MatIconModule,
		MatMenuModule
	],
	template: `
		<n7h-club-chapters (chapterChange)="onChapterChange($event)" [club]="club">
			<h2>{{ 'CLUBS.OFFICE_MEMBERS' | translate }}</h2>
			<ul>
				<li class="member" *ngFor="let member of chapter?.officeMembers">
					<button
						mat-icon-button
						*ngIf="club.isGodfather"
						class="options"
						[matMenuTriggerFor]="officeMemberMenu"
					>
						<mat-icon>more_vert</mat-icon>
					</button>
					<mat-menu #officeMemberMenu="matMenu">
						<button mat-menu-item>
							<mat-icon>edit</mat-icon>
							<span>{{ 'CLUBS.CHANGE_TITLE' | translate }}</span>
						</button>
						<button mat-menu-item>
							<mat-icon>remove_circle_outline</mat-icon>
							<span>{{ 'CLUBS.KICK_OUT' | translate }}</span>
						</button>
					</mat-menu>
					<a [routerLink]="'../../../profiles/' + member.id">
						<img
							[ngSrc]="member.photoUrl"
							width="75"
							height="75"
							[alt]="member.displayName"/>
						<span>
							<h3>{{ member.displayName }}</h3>
							<p>{{ member.title }}</p>
						</span>
					</a>
				</li>
			</ul>
			<h2>{{ 'CLUBS.MEMBERS' | translate }}</h2>
			<ul>
				<li class="member" *ngFor="let member of chapter?.members">
					<button
						mat-icon-button
						*ngIf="club.isOfficeMember || club.isGodfather"
						class="options"
						[matMenuTriggerFor]="memberMenu"
					>
						<mat-icon>more_vert</mat-icon>
					</button>
					<mat-menu #memberMenu="matMenu">
						<button mat-menu-item *ngIf="club.isGodfather">
							<mat-icon>trending_up</mat-icon>
							<span>{{ 'CLUBS.PROMOTE_TO_OFFICE' | translate }}</span>
						</button>
						<button mat-menu-item *ngIf="club.isOfficeMember">
							<mat-icon>remove_circle_outline</mat-icon>
							<span>{{ 'CLUBS.KICK_OUT' | translate }}</span>
						</button>
					</mat-menu>
					<a [routerLink]="'../../../profiles/' + member.id">
						<img
							[ngSrc]="member.photoUrl"
							width="75"
							height="75"
							[alt]="member.displayName"/>
						<span>
							<h3>{{ member.displayName }}</h3>
							<p>{{ member.email }}</p>
						</span>
					</a>
				</li>
			</ul>
		</n7h-club-chapters>
	`,
	styles: [`
		.container {
			width: 90%;
			margin-bottom: 2rem;
		}
		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: left;
			gap: 3rem;
			list-style: none;
			padding: 0;
			width: 100%;
			li {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				transition: all 0.2s ease-in-out;
				border-radius: 10px;
				padding: 1rem;
				position: relative;
				&:hover {
					scale: 1.02;
					background: var(--highlight);
				}
				.options {
					position: absolute;
					top: 0;
					right: 0;
				}
				a {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					text-decoration: none;
					color: inherit;

					img {
						border-radius: 50%;
						margin-bottom: 0.5rem;
						border: 5px solid var(--primary);
						-webkit-user-drag: none;
					}
					span {
						text-align: center;
						h3 {
							margin: 0;
							font-size: 1rem;
						}
						p {
							margin: 0;
							font-size: 0.8rem;
						}
					}
				}
			}
		}
	`]
})
export class ClubMembersComponent {
	constructor() {}
	@Input() club!: Club;
	chapter: ClubChapter | undefined;
	onChapterChange(event: ClubChapter): void {
		this.chapter = event;
	}
}
