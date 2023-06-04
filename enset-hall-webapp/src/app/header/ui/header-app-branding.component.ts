import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterLink } from "@angular/router";
import { MatRippleModule } from "@angular/material/core";

@Component({
	selector: "n7h-header-app-branding",
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		RouterLink,
		MatRippleModule
	],
	template: `
		<a
			matRipple
			class="branding"
			routerLink="/home">
			<img
				class="n7h-logo undraggable"
				src="../../../assets/vectors/enset-hall-h-only.svg"
				alt="{{ 'ENSET_HALL_LOGO' | translate }}"
			/>
			<span class="n7h-title undraggable">{{ 'ENSET_HALL' | translate }}</span>
		</a>
	`,
	styles: [`
		.branding {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			text-decoration: none;
			gap: 1rem;
			.n7h-logo {
				height: 2.5rem;
				width: 2.5rem;
			}
			.n7h-title {
				font-size: 1.2rem;
				font-weight: 600;
				color: white;
			}
		}
		@media (max-width: 680px) {
			.branding {
				.n7h-title {
					display: none;
				}
			}
		}
	`],
})
export class HeaderAppBrandingComponent {
	constructor() {}
}
