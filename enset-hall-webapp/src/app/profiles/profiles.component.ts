import {Component, OnDestroy, OnInit} from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import {MainContentComponent} from "../home/components/main-content.component";
import {SectionNavComponent} from "../main/ui/section-nav.component";
import {SideExtraComponent} from "../home/components/side-extra.component";
import {Select, Store} from "@ngxs/store";
import {AppUser} from "../authentication/models/AppUser";
import {Router} from "@angular/router";
import {AuthUser} from "../authentication/models/AuthUser";
import {map, Observable, take} from "rxjs";
import {ProfilesActions} from "./profiles.actions";
import {ProfilesState} from "./profiles.state";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
	selector: "n7h-profiles",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		MainContentComponent,
		SectionNavComponent,
		SideExtraComponent,
		MatProgressSpinnerModule
	],
	templateUrl: "./profiles.component.html",
	styleUrls: ["./profiles.component.scss"]
})
export class ProfilesComponent implements OnInit, OnDestroy {
	id?: string;

	profiles$: Observable<AppUser[]> =
		this.store.select<[]>(ProfilesState);

	profile$: Observable<AppUser | undefined> = this.profiles$.
	pipe(map(profiles =>
		profiles.find(profile => profile.id === this.id)));
	constructor(private store: Store, private router: Router) {}

	ngOnDestroy(): void {

    }

	ngOnInit(): void {
		this.id = this.router.url.split("/")[2];
		this.store.dispatch(new ProfilesActions.GetProfile(this.id));
	}
}
