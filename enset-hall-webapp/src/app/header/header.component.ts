import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderAppBrandingComponent } from "./ui/header-app-branding.component";
import { ToggleThemeWidgetComponent } from "../user-preferences/components/toggle-theme-widget.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HeaderProfileButtonComponent } from "./ui/header-profile-button.component";

@Component({
	selector: "n7h-header",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		HeaderAppBrandingComponent,
		ToggleThemeWidgetComponent,
		MatToolbarModule,
		HeaderProfileButtonComponent
	],
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss", "./header.component.m.scss"]
})
export class HeaderComponent {
	constructor() {}
}
