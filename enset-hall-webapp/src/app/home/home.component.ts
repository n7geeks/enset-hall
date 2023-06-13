import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {SectionNavComponent} from "../main/ui/section-nav.component";
import {SideExtraComponent} from "./components/side-extra.component";
import {MainContentComponent} from "./components/main-content.component";
import {Store} from "@ngxs/store";
import {AnnouncementsActions} from "../announcements/announcements.actions";
import {PostsActions} from "../posts/posts.actions";
import {StandsActions} from "../stands/stands.actions";


@Component({
	selector: 'n7h-home',
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
		SideExtraComponent,
		MainContentComponent
	],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
	isSmallScreen: boolean = false;
	constructor(private store: Store) { }
	ngOnInit(): void {
		this.isSmallScreen = window.innerWidth < 680;
		window.addEventListener("resize", () => {
			this.isSmallScreen = window.innerWidth < 680;
		});
	}
	ngOnDestroy(): void {
		window.removeEventListener("resize", () => {
			this.isSmallScreen = window.innerWidth < 680;
		});
	}

	ngAfterViewInit(): void {
		this.store.dispatch(new AnnouncementsActions.FetchAnnouncements());
		this.store.dispatch(new PostsActions.FetchPosts());
		this.store.dispatch(new StandsActions.FetchStands());
	}

}
