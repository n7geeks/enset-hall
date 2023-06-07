import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
	selector: 'n7h-section-nav',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatRippleModule, MatSidenavModule, RouterLink, RouterLinkActive, TranslateModule],
	template: `
		<mat-drawer-container class="">
			<mat-drawer mode="side" [opened]="!isSmallScreen">
				<ul>
					<li>
						<a matRipple
						   routerLink="/home"
						   routerLinkActive="active">
							<mat-icon>
								<svg class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
									 stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
									<path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
									<path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
								</svg>
							</mat-icon>
							{{ "SIDE_NAV.HOME" | translate }}
						</a>
					</li>
					<li>
						<a matRipple
						   routerLink="/clubs"
						   routerLinkActive="active">
							<mat-icon>
								<svg class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
									 stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path
										d="M12 3a4 4 0 0 1 3.164 6.447a4 4 0 1 1 -1.164 6.198v1.355l1 4h-6l1 -4l0 -1.355a4 4 0 1 1 -1.164 -6.199a4 4 0 0 1 3.163 -6.446z"></path>
								</svg>
							</mat-icon>
							{{ "SIDE_NAV.CLUBS" | translate }}
						</a>
					</li>
				</ul>
			</mat-drawer>
			<mat-drawer-content>
				<ng-content></ng-content>
			</mat-drawer-content>
		</mat-drawer-container>
	`,
	styles: [`
		:host {
			display: block;
			height: 100%;
			width: 100%;
		}

		mat-drawer-content {
			padding: 1rem;
		}

		mat-drawer-container {
			height: 100%;
			width: 100%;

			mat-drawer {
				width: 15rem;
				padding: 1rem 1rem;

				ul {
					list-style: none;
					margin-top: 2rem;
					padding: 0;

					li {
						a {
							text-decoration: none;
							font-size: 1rem;
							margin: 0.5rem 0;
							background-color: var(--background);
							border-radius: .5rem;
							color: var(--text);
							padding: .5rem 1rem;
							cursor: pointer;
							display: flex;
							align-items: center;
							gap: 1rem;

							&:hover {
								background-color: var(--highlight);
							}

							&.active {
								background-color: var(--tab);
							}

							.icon {
								stroke: var(--text);
							}
						}
					}
				}
			}
		}
	`]
})
export class SectionNavComponent implements OnInit, OnDestroy {
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
