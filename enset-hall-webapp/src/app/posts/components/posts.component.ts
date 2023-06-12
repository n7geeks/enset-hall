import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Store} from "@ngxs/store";
import {Post} from "../posts.models";
import {PostComponent} from "./post.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
	selector: "n7h-posts",
	standalone: true,
	imports: [
		CommonModule,
		PostComponent,
		TranslateModule
	],
	template: `
		<div class="posts">
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
            align-items: center;
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
export class PostsComponent {
	constructor(private store: Store) {}
	posts$ = this.store.select<Post[]>(state => state.posts);
}