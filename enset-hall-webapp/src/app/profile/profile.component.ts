import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";

@Component({
	selector: "n7h-profile",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule
	],
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent {
	constructor() {}
}
