import {Component, Inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {Store} from "@ngxs/store";
import {map} from "rxjs";
import {RouterLink} from "@angular/router";
import {Post, PostComment} from "../posts.models";
import { PostsActions } from "../posts.actions";

@Component({
	selector: "n7h-post-comments",
	standalone: true,
	imports: [
		CommonModule,
		MatListModule,
		MatLineModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		TranslateModule,
		ReactiveFormsModule,
		MatInputModule,
		RouterLink
	],
	template: `
        <mat-nav-list *ngIf="post$ | async as post">
            <mat-card mat-list-item *ngFor="let comment of post.comments" class="card">
                <mat-card-header routerLink="/profiles/{{comment.commenter?.id}}">
                    <div
                            [style.background-image]="'url(' + comment.commenter?.photoUrl + ')'"
                            mat-card-avatar class="header-image">
                    </div>
                    <mat-card-title>{{comment.commenter?.displayName}}</mat-card-title>
                    <mat-card-subtitle>{{ comment.createdAt | date }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                    <p>{{comment.content}}</p>
                </mat-card-content>
                <mat-card-actions>
                    <button mat-button (click)="toggleHeart(comment)">
                        <mat-icon color="warn" *ngIf="comment.hearted; else notHearted">favorite</mat-icon>
                        <ng-template #notHearted>
                            <mat-icon color="warn">favorite_outline</mat-icon>
                        </ng-template>
                        <span>{{ 'POSTS.HEARTS_COUNT' | translate: {count: comment.heartsNumber} }}</span>
                    </button>
                </mat-card-actions>
            </mat-card>
        </mat-nav-list>
        <form [formGroup]="form">
            <mat-form-field
                class="form-field"
                hintLabel="max 255 characters"
                appearance="outline">
                <input matInput type="text" formControlName="newComment">
                <button matSuffix mat-icon-button [disabled]="!form.valid" (click)="submit()">
                    <mat-icon>send</mat-icon>
                </button>
            </mat-form-field>
        </form>
	`,
	styles: [`
      mat-card-header {
        cursor: pointer;
      }
	    .mat-mdc-list-base {
	      display: flex;
	      flex-direction: column;
	      gap: 1rem;
	    }
		.header-image {
          background-size: cover;
		}
		.mdc-card__actions {
            justify-content: flex-end;
		}
		.mat-mdc-card {
		  background-color: var(--tab);
		}
        ::ng-deep .mat-bottom-sheet-container {
          background-color: var(--highlight);
          padding-bottom: 0;
        }
        form {
          width: 100%;
          z-index: 10;
          position: sticky;
          bottom: 0;
          right: 0;
          left: 0;
          background: var(--highlight);
          mat-form-field {
        	width: 100%;
          }
        }
	`]
})
export class PostCommentsBottomSheet {
	post$ = this.store
		.select<Post[]>(state => state.posts)
		.pipe(map(posts => posts.find(post => post.id === this.data)));
	constructor(private store: Store,
	            @Inject(MAT_BOTTOM_SHEET_DATA) public data: string) {}
	form = new FormGroup({
		newComment: new FormControl("", [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(255)
		])
	});
	submit() {
		if (!this.form.valid) return;
		const newComment = this.form.value.newComment;
		if (!newComment) return;
		this.store.dispatch(new PostsActions.SubmitComment(this.data, newComment));
		this.form.reset();
	}

	toggleHeart(comment: PostComment) {
		this.store.dispatch(new PostsActions.ToggleHeartComment(comment));
	}
}