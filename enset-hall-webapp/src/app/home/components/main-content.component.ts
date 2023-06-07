import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnnouncementsComponent} from "./announcements.component";

@Component({
	selector: 'n7h-main-content',
	standalone: true,
	imports: [CommonModule, AnnouncementsComponent],
	template: `
		<n7h-announcements></n7h-announcements>
	`,
	styles: [``]
})
export class MainContentComponent {}
