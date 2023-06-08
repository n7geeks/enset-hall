import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Club} from "../../club.models";

@Component({
	selector: "n7h-club-posts",
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
export class ClubPostsComponent {
	constructor() {}
	@Input() club?: Club;
}
