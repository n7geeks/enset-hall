import {Component} from "@angular/core";
import {Store} from "@ngxs/store";
import {FooterComponent} from "../../footer/footer.component";
import {ActiveStandsComponent} from "./active-stands.component";
import {AsideFooterComponent} from "./aside-footer.component";

@Component({
	selector: 'n7h-side-extra',
	standalone: true,
	template: `
		<n7h-active-stands></n7h-active-stands>
		<n7h-aside-footer></n7h-aside-footer>
	`,
	imports: [
		FooterComponent,
		ActiveStandsComponent,
		AsideFooterComponent
	],
	styles: [`
	`]
})
export class SideExtraComponent {
	constructor() {}
}
