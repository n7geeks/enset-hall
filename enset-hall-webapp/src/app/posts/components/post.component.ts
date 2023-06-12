import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Post} from "../posts.models";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {TranslateModule} from "@ngx-translate/core";
import {ImageViewerService} from "../../shared/image-viewer.service";

@Component({
	selector: "n7h-post",
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatBadgeModule,
		TranslateModule
	],
	template: `
        <mat-card class="card">
            <mat-card-header>
                <div mat-card-avatar
                     [style.background-image]="'url(' + post.poster?.photoUrl + ')'"
                     class="header-image"
                ></div>
                <mat-card-title>{{ post.poster?.displayName }}</mat-card-title>
                <mat-card-subtitle>{{ post.poster?.email }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
                <p>
                    {{ post.content }}
                </p>
	            <img *ngIf="post.hasImage && post.imageUrl"
	                 mat-card-image
	                 (click)="$event.stopPropagation(); imageViewer.view(post.imageUrl)"
	                 [src]="post.imageUrl"
	                 alt="" />
            </mat-card-content>
            <mat-card-actions>
                <button mat-button>
                    <mat-icon color="warn" *ngIf="post.hearted; else notHearted">favorite</mat-icon>
	                <ng-template #notHearted>
						<mat-icon color="warn">favorite_outline</mat-icon>
					</ng-template>
	                <span>{{ 'POSTS.HEARTS_COUNT' | translate: { count: post.heartsNumber } }}</span>
                </button>
                <button mat-button>
                    <mat-icon>comment</mat-icon>
	                <span>{{ 'POSTS.COMMENTS_COUNT' | translate: { count: post.commentsNumber } }}</span>
                </button>
	            <button mat-button>
		            <mat-icon>share</mat-icon>
		            <span>{{ 'POSTS.SHARE' | translate }}</span>
                </button>
            </mat-card-actions>
        </mat-card>
	`,
	styles: [`
	  :host {
	  	width: 100%;
      }
	  .card {
        width: 100%;
	    cursor: pointer;
	    background-color: var(--highlight);
        img {
          border-radius: 10px;
        }
        mat-card-title {
          font-size: 1rem;
        }
        mat-card-subtitle {
          font-size: 0.8rem;
        }
	  }
      .header-image {
        background-size: cover;
      	}
	`]
})
export class PostComponent {
	@Input() post!: Post;
	constructor(public imageViewer: ImageViewerService) {
	}
}