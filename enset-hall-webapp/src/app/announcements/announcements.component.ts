import {Component} from "@angular/core";
import {Store} from "@ngxs/store";
import {Announcement} from "./announcements.models";
import {AnnouncementComponent} from "./announcement.component";
import {CommonModule} from "@angular/common";
import {map} from "rxjs";
import {AddAnnouncementComponent} from "./add-announcement.component";

@Component({
	selector: "n7h-announcements",
	standalone: true,
	imports: [
		CommonModule,
		AnnouncementComponent,
		AddAnnouncementComponent
	],
	template: `
		<div class="announcements">
            <n7h-add-announcement></n7h-add-announcement>
			<n7h-announcement
				*ngFor="let announcement of announcement$ | async"
				[announcement]="announcement"></n7h-announcement>
		</div>
	`,
	styles: [`
		.announcements {
			display: flex;
			gap: .5rem;
			width: 650px;
			height: 200px;
			overflow-x: scroll;
			overflow-y: hidden;
			scrollbar-width: none;
			-ms-overflow-style: none;
			position: relative;
			padding: .5rem;
			&::-webkit-scrollbar {
				display: none;
			}
		}
	`]
})
export class AnnouncementsComponent {
	announcement$ =
		this.store.select<Announcement[]>(state => state.announcements)
			.pipe(map(announcements =>
				announcements.sort((a, b) => {
					if (a.seen && !b.seen) return 1;
					if (!a.seen && b.seen) return -1;
					return 0;
				}
	)));

	constructor(private store: Store) {}
}
