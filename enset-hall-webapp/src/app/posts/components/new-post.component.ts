import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {Store} from "@ngxs/store";
import {AuthUser} from "../../authentication/models/AuthUser";
import {RouterLink} from "@angular/router";
import {MatButtonToggleGroup, MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {Club} from "../../clubs/club.models";
import {map} from "rxjs";

@Component({
	selector: "n7h-new-post",
	standalone: true,
	imports: [CommonModule, RouterLink, TranslateModule, MatCardModule, NgOptimizedImage, MatButtonToggleModule, MatIconModule],
	template: `
        <mat-card *ngIf="user$ | async as user" (click)="open(post.checked ? post.value : (poll.checked ? poll.value : announcement.value))">
            <h2>
                <img
                    [ngSrc]="user.photoUrl || 'assets/blank-profile.png'"
                    class="undraggable"
                    width="50"
                    height="50"
                    routerLink="/profiles/{{user.uid}}"
                    (click)="$event.stopPropagation();"
                    [alt]="user.displayName" />
                <span class="undraggable">{{ 'POSTS.NEW_POST_HINT' | translate }}</span>
            </h2>
            <mat-button-toggle-group name="type" value="post" (click)="$event.stopPropagation()">
                <mat-button-toggle value="post" #post>
                    <mat-icon>
                        <svg class="icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M8 9h8"></path>
                            <path d="M8 13h6"></path>
                            <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z"></path>
                        </svg>
                    </mat-icon>
	                <span>{{ 'POSTS.POST' | translate }}</span>
                </mat-button-toggle>
                <mat-button-toggle value="announcement" #announcement>
                    <mat-icon>
                        <svg class="icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969"></path>
                            <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554"></path>
                            <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592"></path>
                            <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305"></path>
                            <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356"></path>
                            <path d="M12 8v4l3 3"></path>
                        </svg>
                    </mat-icon>
                    <span>{{ 'POSTS.ANNOUNCEMENT' | translate }}</span>
                </mat-button-toggle>
                <mat-button-toggle value="poll" #poll>
                    <mat-icon>
                        <svg class="icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                            <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                            <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                            <path d="M4 20l14 0"></path>
                        </svg>
                    </mat-icon>
                    <span>{{ 'POSTS.POLL' | translate }}</span>
                </mat-button-toggle>
            </mat-button-toggle-group>
        </mat-card>
	`,
	styles: [`
	  
	   .icon {
	     color: var(--text);
	     
	   }
	  	mat-icon {
			margin-right: 1rem;
	    }
		mat-card {
			padding: 1rem;
			background: var(--highlight);
			display: flex;
			flex-direction: column;
		    width: 675px;
		  	gap: 1rem;
			cursor: pointer;
			&:hover {
				scale: 1.01;
			}
		  	h2 {
				display: flex;
                align-items: center;
                margin-bottom: 1rem;
                span {
					margin-left: 1rem;
					font-size: 1.2rem;
					font-weight: 300;
					color: var(--text);
					opacity: 0.8;
                }
            	img {
                    border-radius: 50%;
	            }
		    }
		}
	`]
})
export class NewPostComponent {
	constructor(private store: Store) {}

	user$ = this.store
		.select<AuthUser>(state => state.authentication.user);

	open(target: string) {
		switch (target) {
			case 'post':
				console.log('New post');
				break;
			case 'announcement':
				console.log('New announcement');
				break;
			case 'poll':
				console.log('New poll');
				break;
		}
	}
}