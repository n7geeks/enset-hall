import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
	selector: "n7h-aside-footer",
	standalone: true,
	template: `
		<div class="container">
			<div class="links">
				<ng-container *ngFor="let link of links; index as i">
					<a [routerLink]="link.url">
						{{ link.name | translate }}
					</a>
					<span *ngIf="i != links.length - 1" class="separator"> · </span>
				</ng-container>
			</div>
			<span class="copyright">{{ 'ENSET Hall © ' + currentYear }}</span>
		</div>

	`,
	imports: [
		CommonModule,
		RouterLink,
		TranslateModule
	],
	styles: [`
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 16rem;
			.links {
				width: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				a:not(:last-child) {
					margin-right: 0.2rem;
				}
				span:not(:last-child) {
					margin-right: 0.2rem;
				}
				a, span {
                  color: var(--text);
                  font-size: 12px;
                }
			}
			.copyright {
				color: var(--text);
				font-size: 14px;
				font-weight: 300;
				margin-top: .5rem;
			}
		}
	`]
})
export class AsideFooterComponent {
	constructor() { }
	protected links: FooterLink[] = [
		{ name: "TOS", url: "/tos" },
		{ name: "PRIVACY_POLICY", url: "/privacy" },
		{ name: "ABOUT", url: "/about" },
		{ name: "FAQ", url: "/faq" },
		{ name: "ROADMAP", url: "/roadmap" },
		{ name: "CONTACT_US", url: "/contact-us" },
	];
	get currentYear(): string {
		return new Date().getFullYear().toString();
	}
}

export interface FooterLink {
	name: string;
	url: string;
}
