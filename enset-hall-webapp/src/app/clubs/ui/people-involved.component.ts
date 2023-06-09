import {Component, Input, OnInit} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AppUser} from "../../authentication/models/AppUser";
import {RouterLink} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";

@Component({
	selector: 'n7h-people-involved',
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, RouterLink, MatMenuModule, MatIconModule],
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
				<div class="person extra" *ngIf="p.length > 4" [matMenuTriggerFor]="menu">
					{{ p.length - 4 }}+
				</div>
				<mat-menu #menu="matMenu">
					<button mat-menu-item *ngFor="let person of others" [routerLink]="['/profiles', person.id]">
						<mat-icon>
							<img
								class="menu-image"
								[src]="person.photoUrl"
								[alt]="person.displayName"
								title="{{ person.displayName }}"/>
						</mat-icon>
						<span>{{ person.displayName }}</span>
					</button>
				</mat-menu>
			</ng-container>
		</div>
	`,
	styles: [`
		.menu-image {
			border-radius: 50%;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.people-involved {
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 3rem;
			position: relative;
			align-items: center;
			.person {
				&:hover {
					scale: 1.1;
				}
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
				&:hover {
					scale: 1.1;
				}
			}
		}
	`]
})
export class PeopleInvolvedComponent implements OnInit {
	@Input() people?: AppUser[];
	topFour?: AppUser[];
	others?: AppUser[];

	ngOnInit(): void {
		this.topFour = this.people?.slice(0, 4);
		this.others = this.people?.slice(4);
	}
}
