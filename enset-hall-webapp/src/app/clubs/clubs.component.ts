import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {SectionNavComponent} from "../main/ui/section-nav.component";


@Component({
	selector: 'n7h-clubs',
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
	templateUrl: './clubs.component.html',
	styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent {
}
