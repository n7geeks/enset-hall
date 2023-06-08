import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Club} from "../../club.models";

@Component({
	selector: "n7h-club-activities",
	standalone: true,
	imports: [
		CommonModule
	],
	template: `
		<ng-container *ngIf="club">
		</ng-container>
	`,
	styles: [``]
})
export class ClubActivitiesComponent {
	constructor() {}
	@Input() club?: Club;
}
