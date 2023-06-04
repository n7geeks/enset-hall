import {Component, OnDestroy, OnInit} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {SectionNavComponent} from "../main/ui/section-nav.component";


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
		SectionNavComponent
	],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	isSmallScreen: boolean = false;
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

}
