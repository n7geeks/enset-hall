import {Component, Input, OnInit} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AppUser} from "../../authentication/models/AppUser";
import {RouterLink} from "@angular/router";

@Component({
	selector: 'n7h-people-involved',
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, RouterLink],
	template: `
		<div class="people-involved">
			<img
				class="person" *ngFor="let person of topFour"
				[ngSrc]="person.photoUrl"
				[alt]="person.displayName"
				title="{{ person.displayName }}"
				[routerLink]="['/profiles', person.id]"
				width="30"
				height="30" />
			<ng-container *ngIf="people as p">
				<div class="person extra" *ngIf="p.length > 4">
					{{ p.length - 4 }}+
				</div>
			</ng-container>
		</div>
	`,
	styles: [`
		.people-involved {
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 3rem;
			position: relative;
			align-items: center;
			img {
				&:hover {
					scale: 1.1;
				}
			}
			.person {
				border-radius: 50%;
				margin-right: -.75rem;
				width: 2rem;
				height: 2rem;
				border: 3px solid var(--primary);
			}
			.extra {
				background: var(--primary);
				color: white;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: .75rem;
				font-weight: bold;
			}
		}
	`]
})
export class PeopleInvolvedComponent implements OnInit {
	@Input() people?: AppUser[];
	topFour?: AppUser[];

	ngOnInit(): void {
		this.topFour = this.people?.slice(0, 4);
	}
}
