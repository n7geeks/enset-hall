import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Club} from "../../club.models";
import {ClubPostsListComponent} from "../../../posts/components/club-posts-list.component";
import {ClubActiveStandsComponent} from "../../../stands/club-active-stands.component";

@Component({
	selector: "n7h-club-posts",
	standalone: true,
	imports: [
		CommonModule,
		ClubPostsListComponent,
		ClubActiveStandsComponent
	],
	template: `
		<ng-container *ngIf="club">
			<n7h-club-posts-list [clubId]="club.id"></n7h-club-posts-list>
			<n7h-club-active-stands [clubId]="club.id"></n7h-club-active-stands>
		</ng-container>
	`,
	styles: [`
	  :host {
	    display: flex;
	    flex-direction: row;
	    width: 100%;
	    gap: 3rem;
      }
	`]
})
export class ClubPostsComponent {
	constructor() {}
	@Input() club?: Club;
}
