import {Component, Inject} from "@angular/core";
import {Stand} from "./stands.models";
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
import { StandsActions } from "./stands.actions";
import {map} from "rxjs";

@Component({
	selector: "n7h-stand-discussions",
	standalone: true,
	imports: [CommonModule, MatListModule, MatLineModule, MatCardModule, MatButtonModule, MatIconModule, TranslateModule, ReactiveFormsModule, MatInputModule],
	template: `
        <mat-nav-list *ngIf="stand$ | async as stand">
            <mat-card mat-list-item *ngFor="let discussion of stand.discussions" class="card">
                <mat-card-header>
                    <div
	                    [style.background-image]="'url(' + discussion.discusser.photoUrl + ')'"
	                    mat-card-avatar class="header-image">
                    </div>
                    <mat-card-title>{{discussion.discusser.displayName}}</mat-card-title>
                    <mat-card-subtitle>{{ discussion.discussedAt | date }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                    <p>{{discussion.content}}</p>
                </mat-card-content>
                <mat-card-actions>
                    <button mat-button>
                        <mat-icon color="warn" *ngIf="discussion.hearted; else notHearted">favorite</mat-icon>
                        <ng-template #notHearted>
                            <mat-icon color="warn">favorite_outline</mat-icon>
                        </ng-template>
                        <span>{{ 'POSTS.HEARTS_COUNT' | translate: { count: discussion.hearts } }}</span>
                    </button>
                </mat-card-actions>
            </mat-card>
        </mat-nav-list>
        <form [formGroup]="form">
            <mat-form-field
		            class="form-field"
		            hintLabel="max 255 characters"
		            appearance="outline">
                <input matInput type="text" formControlName="newDiscussion" >
                <button matSuffix mat-icon-button [disabled]="!form.valid" (click)="submit()">
                    <mat-icon>send</mat-icon>
                </button>
            </mat-form-field>
        </form>
	`,
	styles: [`
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
export class StandDiscussionsBottomSheet {
	stand$ = this.store
		.select<Stand[]>(state => state.stands)
		.pipe(map(stands => stands.find(stand => stand.id === this.data)));
	constructor(private store: Store,
	            @Inject(MAT_BOTTOM_SHEET_DATA) public data: string) {}
	form = new FormGroup({
		newDiscussion: new FormControl("", [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(255)
		])
	});
	submit() {
		if (!this.form.valid) return;
		const newDiscussion = this.form.value.newDiscussion;
		if (!newDiscussion) return;
		this.store.dispatch(new StandsActions.SubmitDiscussion(this.data, newDiscussion));
		this.form.reset();
	}
}