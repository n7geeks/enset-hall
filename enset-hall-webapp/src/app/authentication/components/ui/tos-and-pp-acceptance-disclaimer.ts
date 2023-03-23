import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
	selector: 'n7h-tos-and-pp-acceptance-disclaimer',
	template: `
		<div class="wrapper">
			<span>{{ "TOS_AND_PP_ACCEPTANCE_DISCLAIMER" | translate }}</span>
			<a href="https://www.n7heroes.com/tos" target="_blank">
				{{ "TOS_AND_PP_ACCEPTANCE_DISCLAIMER_LINK" | translate }}
			</a>
		</div>
	`,
	styles: [`
		.wrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 0.8rem;
			margin-top: 1rem;
			a {
				color: white;
				text-decoration: underline;

			}
		}
	`],
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
	]
})
export class TosAndPpAcceptanceDisclaimerComponent {
	constructor() {}
}
