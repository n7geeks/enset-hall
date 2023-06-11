import {Component, Input, OnInit} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Club} from "../club.models";
import {MatRippleModule} from "@angular/material/core";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {PeopleInvolvedComponent} from "./people-involved.component";
import {AppUser} from "../../authentication/models/AppUser";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {ClubActionButtonComponent} from "./club-action-button.component";

@Component({
	selector: 'n7h-club-card',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatRippleModule, RouterLink, NgOptimizedImage, MatIconModule, PeopleInvolvedComponent, TranslateModule, ClubActionButtonComponent],
	template: `
	<div matRipple
		 class="club-card"
		 [style.background-image]="'url(' + club.banner + ')'">
		<a class="club-card__content" [routerLink]="['/clubs', club.handle]">
			<img
				class="club-card__content__logo"
				[ngSrc]="club.logo"
				width="100"
				height="100"
				[alt]="club.name + ' logo'" />
			<div class="club-card__content__text">
				<div class="club-card__content__text__name-ade">
					<h2>{{club.name}}</h2>
					<img
						*ngIf="club.isAdeClub"
						alt="Ade icon"
						ngSrc="../../../assets/vectors/ade-icon.svg"
						width="30"
						height="30"
					>
				</div>
				<p>{{club.catchphrase}}</p>
			</div>
		</a>
		<div class="club-card__content__members-actions">
			<n7h-people-involved [people]="people"></n7h-people-involved>
			<div class="club-card__content__members-actions__members">
				<p>{{ 'CLUBS.MEMBERS' | translate }}</p>
				<div class="spacer"></div>
				<p>{{ people.length }}</p>
			</div>
			<n7h-club-action-button [club]="club"></n7h-club-action-button>
		</div>
	</div>
`,
	styles: [`
		a {
			text-decoration: none;
			color: white;
		}

		.club-card__content__members-actions {
			position: absolute;
			right: 0;
			height: 100%;
			color: white;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			margin-inline-end: 20px;
			.club-card__content__members-actions__members {
				display: flex;
				padding: 1rem;
				height: .2rem;
				width: 7rem;
				border-radius: 10px;
				background-color: rgba(0, 0, 0, 0.2);
				justify-content: center;
				align-items: center;
				margin-bottom: .5rem;
			}
			n7h-club-action-button {
				width: 100%;
			}

		}
		.club-card {
			position: relative;
			width: 1040px;
			height: 150px;
			border-radius: 10px;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			cursor: pointer;
			display: flex;
			&:hover {
				filter: brightness(0.9);
			}
			.club-card__content {
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				display: flex;
				align-items: center;
				padding: 0 20px;
				.club-card__content__logo {
					display: block;
					border-radius: 50%;
				}
				.club-card__content__text {
					margin-inline-start: 20px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.club-card__content__text__name-ade {
						display: flex;
						align-items: center;
						h2 {
							margin: 0;
							margin-inline-end: 10px;
						}
					}
					p {
						margin: 0;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						max-width: 500px;
						font-size: 1.2rem;
					}
				}
			}
		}
	`]
})
export class ClubCardComponent implements OnInit {
	@Input() club!: Club;
	people: AppUser[] = [];
	ngOnInit(): void {
		const latestChapter = this.club.chapters.reduce((a, b) => a.year > b.year ? a : b);
		const set = new Set<AppUser>();
		latestChapter.members.forEach(member => set.add(member));
		latestChapter.officeMembers.forEach(member => set.add(member));
		this.people = Array.from(set);
	}

	protected readonly console = console;
}
