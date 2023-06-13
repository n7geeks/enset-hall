import {Component, Input} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Stand} from "./stands.models";
import {RouterLink} from "@angular/router";
import {MatRippleModule} from "@angular/material/core";
import {PeopleInvolvedComponent} from "../clubs/ui/people-involved.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {StandDiscussionsBottomSheet} from "./stand-discussions.bottom-sheet";

@Component({
	selector: 'n7h-active-stand',
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, RouterLink, MatRippleModule, PeopleInvolvedComponent],
	template: `
		<div
			class="active-stand"
			matRipple
			*ngIf="stand">
			<a
				class="active-stand__link"
				(click)="openDiscussions(stand)"
			>
				<div class="club-info">
					<h2>{{stand.club?.name}}</h2>
					<img
						[ngSrc]="stand.club?.logo || 'assets/images/club-logo-placeholder.png'"
						[alt]="stand.club?.name"
						[width]="imageSize"
						[height]="imageSize" />
				</div>
				<p>{{stand.subject}}</p>
			</a>
			<n7h-people-involved [people]="stand.organizers"></n7h-people-involved>
		</div>
	`,
	styles: [`
		.active-stand {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 8rem;
			background: linear-gradient(89.84deg, rgba(9, 16, 79, 0.532) 0.12%, rgba(12, 140, 233, 0.553) 99.85%), #0C8CE9;
			border-radius: 10px;
			cursor: pointer;
			padding: .75rem;
			.active-stand__link {
				color: white;
				text-decoration: none;
				width: 100%;
				height: 100%;
			}
			.club-info {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				h2 {
					font-size: 1rem;
				}
				img {
					border-radius: 50%;
				}
			}
			p {
				font-size: .75rem;
				margin: 0;

			}
			&:hover {
				filter: brightness(1.1);
			}
		}
		
	`]
})
export class ActiveStandComponent {
	@Input() stand?: Stand;
	imageSize = 45;
	constructor(private bottomSheet: MatBottomSheet) {
	}

	openDiscussions(stand: Stand) {
		this.bottomSheet.open(StandDiscussionsBottomSheet, {
			data: stand.id
		})
	}
}
