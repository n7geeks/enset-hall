import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import { AnnouncementsComponent } from "../../announcements/announcements.component";
import {NewPostComponent} from "../../posts/components/new-post.component";
import {PostsComponent} from "../../posts/components/posts.component";

@Component({
	selector: 'n7h-main-content',
	standalone: true,
	imports: [CommonModule, AnnouncementsComponent, AnnouncementsComponent, NewPostComponent, PostsComponent],
	template: `
		<n7h-announcements></n7h-announcements>
		<div class="separator"></div>
		<n7h-new-post></n7h-new-post>
		<n7h-posts></n7h-posts>
	`,
	styles: [`
		.separator {
            width: 100%;
            height: 2rem;
        }
	`]
})
export class MainContentComponent {}
