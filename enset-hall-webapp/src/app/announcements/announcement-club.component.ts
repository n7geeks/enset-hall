import {Component, Input} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Club} from "../clubs/club.models";
import {RouterLink} from "@angular/router";

@Component({
	selector: "n7h-announcement-club",
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, RouterLink],
	template: `
		<ng-container *ngIf="club">
			<a class="club" [routerLink]="['..', 'clubs', club.handle]">
				<img [ngSrc]="club.logo" width="30" height="30" [alt]="club.name"/>
				<span>{{club.name}}</span>
			</a>
		</ng-container>
	`,
	styles: [`
		.club {
			position: absolute;
			bottom: .2rem;
			left: .2rem;
			display: flex;
			align-items: center;
			gap: .4rem;
			text-decoration: none;
			color: white;
			img {
				border-radius: 50%;
				filter: drop-shadow(0 0 2px rgba(0, 0, 0, .5));
			}
			span {
				font-size: .8rem;
				font-weight: 500;
				filter: drop-shadow(0 0 2px rgba(0, 0, 0, .5));
			}
		}
	`]
})
export class AnnouncementClubComponent {
	@Input() club: Club | undefined | null;
	constructor() {}
}
