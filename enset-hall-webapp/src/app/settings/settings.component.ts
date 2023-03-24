import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import { MatRippleModule } from "@angular/material/core";

@Component({
	selector: "n7h-settings",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		MatSidenavModule,
		RouterLink,
		RouterLinkActive,
		MatRippleModule,
		RouterModule
	],
	templateUrl: "./settings.component.html",
	styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit, OnDestroy {
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
