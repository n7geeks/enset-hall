import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Store} from "@ngxs/store";
import {Post} from "../posts.models";
import {PostComponent} from "./post.component";
import {TranslateModule} from "@ngx-translate/core";
import {map} from "rxjs";
import {MatIconModule} from "@angular/material/icon";
import {Club} from "../../clubs/club.models";
import {MatButtonModule} from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import {NewPostDialog} from "../dialogs/new-post.dialog";

@Component({
	selector: "n7h-club-posts-list",
	standalone: true,
	imports: [
		CommonModule,
		PostComponent,
		TranslateModule,
		MatIconModule,
		MatButtonModule
	],
	template: `
		<div class="posts" *ngIf="club$ | async as club">
	        <h2>
	            {{ 'POSTS' | translate }}
		        <button
			        mat-mini-fab
			        color="primary"
			        (click)="openPostDialog(club)"
			        *ngIf="club.isOfficeMember || club.isGodfather">
			        <mat-icon>add</mat-icon>
                </button>
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
          h2 {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: .3rem;
            button {
              scale: .7;
            }
          }
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
	constructor(
		private dialog: MatDialog,
		private store: Store) {}
	@Input() clubId!: string;

	club$ = this.store.
		select<Club[]>(state => state.clubs).
		pipe(map(clubs => clubs.
		find(club => club.id === this.clubId)));

	posts$ = this.store.
		select<Post[]>(state => state.posts).
		pipe(map(posts => posts.
		filter(post => post.club?.id === this.clubId))).
		pipe(map(posts => posts.
		sort((a, b) => b.createdAt - a.createdAt)));

	openPostDialog(club: Club) {
		this.dialog.open(NewPostDialog, {
			data: club
		});
	}
}