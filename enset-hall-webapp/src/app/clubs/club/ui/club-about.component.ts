import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Club} from "../../club.models";
import {TranslateModule} from "@ngx-translate/core";

@Component({
	selector: "n7h-club-about",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule
	],
	template: `
		<ng-container *ngIf="club">
			<h2>{{ 'CLUBS.ABOUT' | translate }}</h2>
			<p>{{ club.about }}</p>
		</ng-container>
	`,
	styles: [`
		p {
			width: 80%;
			word-break: break-word;
		}
	`]
})
export class ClubAboutComponent {
	constructor() {}
	@Input() club?: Club;
}
