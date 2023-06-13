import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Store} from "@ngxs/store";
import {Post} from "../posts.models";
import {PostComponent} from "./post.component";
import {TranslateModule} from "@ngx-translate/core";
import {filter, map} from "rxjs";
import {MatIconModule} from "@angular/material/icon";

@Component({
	selector: "n7h-club-posts-list",
	standalone: true,
	imports: [
		CommonModule,
		PostComponent,
		TranslateModule,
		MatIconModule
	],
	template: `
		<div class="posts">
	        <h2>
	            {{ 'POSTS' | translate }}
	        </h2>
            <n7h-post *ngFor="let post of posts$ | async" [post]="post"></n7h-post>
            <div class="no-posts">
	            {{ "POSTS.NO_POSTS" | translate }}
            </div>
		</div>
	`,
	styles: [`
	  :host {
	    display: contents;
	  }
		.posts {
            display: flex;
            flex-direction: column;
            width: 675px;
		  	height: 100%;
            gap: 1rem;
            margin-top: 1rem;
		  	margin-bottom: 1rem;
        }
		.no-posts {
          font-size: 1.2rem;
          color: var(--text);
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  width: 675px;
        }
	`]
})
export class ClubPostsListComponent {
	constructor(private store: Store) {}
	@Input() clubId!: string;
	posts$ = this.store.
	select<Post[]>(state => state.posts).
	pipe(map(posts => posts.
	filter(post => post.club?.id === this.clubId)));
}