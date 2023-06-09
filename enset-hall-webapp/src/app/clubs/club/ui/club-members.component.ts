import {Component, Input, OnInit} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Club, ClubChapter} from "../../club.models";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
	selector: "n7h-club-members",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		NgOptimizedImage,
		RouterLink
	],
	template: `
		<div class="container" *ngIf="latestChapter">
			<h2>{{ 'CLUBS.OFFICE_MEMBERS' | translate }}</h2>
			<ul>
				<li class="member" *ngFor="let member of latestChapter.officeMembers">
					<a [routerLink]="'../../../profiles/' + member.id">
						<img
							[ngSrc]="member.photoUrl"
							width="75"
							height="75"
							[alt]="member.displayName" />
						<span>
							<h3>{{ member.displayName }}</h3>
							<p>{{ member.title }}</p>
						</span>
					</a>
				</li>
			</ul>
			<h2>{{ 'CLUBS.MEMBERS' | translate }}</h2>
			<ul>
				<li class="member" *ngFor="let member of latestChapter.members">
					<a [routerLink]="'../../../profiles/' + member.id">
						<img
							[ngSrc]="member.photoUrl"
							width="75"
							height="75"
							[alt]="member.displayName" />
						<span>
							<h3>{{ member.displayName }}</h3>
							<p>{{ member.email }}</p>
						</span>
					</a>
				</li>
			</ul>
		</div>
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
				&:hover {
					scale: 1.02;
					background: var(--highlight);
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
export class ClubMembersComponent implements OnInit {
	constructor() {}
	@Input() club?: Club;
	latestChapter: ClubChapter | undefined;

	ngOnInit(): void {
		if (this.club) {
			this.latestChapter = this.club.chapters
				.sort((a, b) => b.year - a.year)[0];
		}
	}

}
