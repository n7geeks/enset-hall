import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { Club } from "../club.models";
import { map } from "rxjs";
import { CommonModule } from "@angular/common";
import { SectionNavComponent } from "../../main/ui/section-nav.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ClubHeaderCardComponent } from "./ui/club-header-card.component";
import { ClubAboutComponent } from "./ui/club-about.component";
import { ClubMembersComponent } from "./ui/club-members.component";
import { ClubActivitiesComponent } from "./ui/club-activities.component";
import { ClubPostsComponent } from "./ui/club-posts.component";

@Component({
	selector: "n7h-club",
	standalone: true,
	imports: [
		CommonModule,
		SectionNavComponent,
		MatProgressSpinnerModule,
		ClubHeaderCardComponent,
		ClubAboutComponent,
		ClubMembersComponent,
		ClubActivitiesComponent,
		ClubPostsComponent
	],
	templateUrl: "./club.component.html",
	styleUrls: ["./club.component.scss"]
})
export class ClubComponent  {
	club$ = this.store
		.select<Club[]>(state => state.clubs)
		.pipe(map(clubs => {
			const handle = this.router.url.split("/")[2];
			return clubs.find(club => club.handle === handle);
		}));
	constructor(private store: Store, private router: Router) {
		const availableTabs = ["about", "members", "activities", "posts"];
		const split = this.router.url.split("/");
		const tab = split[3];
		if (!availableTabs.includes(tab)) {
			this.tab = "posts";
			this.router.navigate(['clubs', split[2], this.tab]);
			return;
		}
		this.tab = tab;
	}
	tab: string;
	onTabChanged(tab: string) {
		this.tab = tab;
		const split = this.router.url.split("/");
		const handle = split[2];
		this.router.navigate(['clubs', handle, tab]);
	}

}
