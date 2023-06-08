import {Component} from "@angular/core";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {Club} from "../club.models";
import {map} from "rxjs";
import {CommonModule} from "@angular/common";
import {SectionNavComponent} from "../../main/ui/section-nav.component";

@Component({
	selector: "n7h-club",
	standalone: true,
	imports: [CommonModule, SectionNavComponent],
	templateUrl: "./club.component.html",
	styleUrls: ["./club.component.scss"]
})
export class ClubComponent {
	club$ = this.store
		.select<Club[]>(state => state.clubs)
		.pipe(map(clubs => {
			const handle = this.router.url.split("/")[2];
			return clubs.find(club => club.handle === handle);
		}));
	constructor(private store: Store, private router: Router) {}
}
