import {Component} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {SectionNavComponent} from "../main/ui/section-nav.component";
import {MatButtonToggleChange, MatButtonToggleModule} from "@angular/material/button-toggle";
import {Store} from "@ngxs/store";
import {Club} from "./club.models";
import {map} from "rxjs";
import {ClubCardComponent} from "./ui/n7h-club-card.component";

enum ClubsView {
	ALL_CLUBS = 'allClubs',
	MY_CLUBS = 'myClubs'
}

@Component({
	selector: 'n7h-clubs',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		MatRippleModule,
		MatSidenavModule,
		RouterLink,
		RouterLinkActive,
		RouterOutlet,
		TranslateModule,
		MatIconModule,
		SectionNavComponent,
		MatButtonToggleModule,
		ClubCardComponent
	],
	templateUrl: './clubs.component.html',
	styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent {
	private clubs$ = this.store.select<Club[]>(state => state.clubs);
	public clubsView$ = this.clubs$;
	constructor(private store: Store) {}
	setView($event: MatButtonToggleChange) {
		console.log($event.value)
		switch ($event.value) {
			case ClubsView.MY_CLUBS:
				this.clubsView$ = this.clubs$
					.pipe(map(clubs =>
						clubs.filter(club => club.isMember)
					));
				break;
			default:
			case ClubsView.ALL_CLUBS:
				this.clubsView$ = this.clubs$;
				break;
		}
	}

	protected readonly ClubsView = ClubsView;
}
