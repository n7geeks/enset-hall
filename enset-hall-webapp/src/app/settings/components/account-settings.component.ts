import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
	selector: 'n7h-account-settings',
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule
	],
	template: `
		<h2>{{ "SETTINGS.ACCOUNT" | translate }}</h2>
	`,
	styles: [`
		:host {
			display: flex;
			width: calc(100% - 4rem);
			height: calc(100% - 4rem);
			padding: 1.5rem 2rem;
		}
	`]
})
export class AccountSettingsComponent {
	constructor() {
	}
}
