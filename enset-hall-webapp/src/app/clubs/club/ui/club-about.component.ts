import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Club} from "../../club.models";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
	selector: "n7h-club-about",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		MatButtonModule,
		MatIconModule
	],
	template: `
		<ng-container *ngIf="club">
			<h2>
				{{ 'CLUBS.ABOUT' | translate }}
				<button
					mat-icon-button
					*ngIf="club.isOfficeMember || club.isGodfather"
				>
					<mat-icon>edit</mat-icon>
				</button>
			</h2>
			<p>{{ club.about }}</p>
		</ng-container>
	`,
	styles: [`
		p {
			width: 80%;
			word-break: break-word;
		}
		h2 {
			display: flex;
			align-items: center;
		}
	`]
})
export class ClubAboutComponent {
	constructor() {}
	@Input() club?: Club;
}
