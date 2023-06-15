import {Component, Inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Store} from "@ngxs/store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {PostsActions} from "../posts.actions";
import {Club} from "../../clubs/club.models";

@Component({
	selector: "n7h-new-post-dialog",
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		TranslateModule,
		MatIconModule,
	],
	template: `
		<mat-card>
			<mat-card-header>
				<mat-card-title>
					<mat-icon>
                        <svg class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M8 9h8"></path>
                            <path d="M8 13h6"></path>
                            <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z"></path>
                        </svg>
					</mat-icon>
					<h3>{{ 'POSTS.NEW_POST' | translate }}</h3>
				</mat-card-title>
			</mat-card-header>
			<mat-card-content>
				<form [formGroup]="form">
					<mat-form-field appearance="outline">
						<textarea
                            formControlName="content"
							matInput
							[rows]="5"
							[placeholder]="'POSTS.NEW_POST_HINT' | translate">
						</textarea>
					</mat-form-field>
					<span class="image-added" *ngIf="image; else addImage">
						{{ image.name }}
					</span>
					<ng-template #addImage>
	                    <button
		                    [style.width]="'100%'"
		                    type="button"
		                    mat-raised-button
		                    (click)="fileInput.click()">
		                    {{ 'POSTS.ADD_IMAGE' | translate }}
	                    </button>
					</ng-template>
                    <input (change)="onChange($event)" hidden #fileInput type="file" [multiple]="false">
				</form>
			</mat-card-content>
			<mat-card-actions>
				<button
                    [style.width]="'100%'"
					mat-raised-button
                    (click)="post()"
					color="primary"
					[disabled]="!form.valid">
					Post
				</button>
			</mat-card-actions>
		</mat-card>
	`,
	styles: [`
    	mat-card {
	    	background-color: var(--highlight);
	    	color: var(--text);
	    	width: 600px;
	    }
	    .image-added {
            display: flex;
            align-items: center;
            justify-content: center;
	        background-color: var(--tab);
	    	border-radius: .5rem;
	    	padding: .5rem;
	    }
        mat-form-field {
            width: 100%;
        }
        mat-card-title {
            display: flex;
            align-items: center;
			justify-content: center;
			gap: .5rem;
	        h3 {
		        color: var(--text);
	        	font-size: 1rem;
	        }
        }
	`]
})
export class NewPostDialog {
	constructor(
		public ref: MatDialogRef<NewPostDialog>,
		@Inject(MAT_DIALOG_DATA) public club: Club,
		private store: Store) {}
	image?: File;
	form = new FormGroup({
		content: new FormControl('', [
			Validators.required,
			Validators.minLength(2)
		])
	});
	post() {
		const { content } = this.form.value;
		if (!content) return;
		if (this.club) {
			this.store.dispatch(new PostsActions.SubmitClubPost(this.club, content, this.image));
		} else {
			this.store.dispatch(new PostsActions.SubmitPost(content, this.image));
		}
		this.ref.close();
	}

	onChange($event: Event) {
		const target = $event.target as HTMLInputElement;
		this.image = (target.files as FileList)[0];
	}
}