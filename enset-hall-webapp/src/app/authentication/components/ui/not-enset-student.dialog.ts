import {Component, OnInit} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {TranslateModule} from "@ngx-translate/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {NgxDropzoneChangeEvent, NgxDropzoneModule} from "ngx-dropzone-compressing";
import {BehaviorSubject, catchError, of} from "rxjs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { InscriptionDocAnalyserService } from "../../inscription-doc-analyser.service";
import {Store} from "@ngxs/store";
import {AuthenticationActions} from "../../state/authentication.actions";

interface ModelSubject {
	processing: boolean;
	error: boolean;
}


@Component({
	selector: 'n7h-not-enset-student-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatCheckboxModule,
		TranslateModule,
		MatExpansionModule,
		MatListModule,
		MatBottomSheetModule,
		NgOptimizedImage,
		MatIconModule,
		MatDialogModule,
		MatButtonModule,
		RouterLink,
		MatProgressSpinnerModule,
		NgxDropzoneModule,
		MatProgressBarModule
	],
	template: `
        <mat-card *ngIf="model$ | async as model">
            <mat-card-header>{{'DIALOG.NOT_STUDENT_ENSET_TITLE' | translate}}</mat-card-header>
            <mat-card-content>
                {{ 'DIALOG.NOT_STUDENT_ENSET_1' | translate }}
                <br/>
                <br/>
                {{ 'DIALOG.NOT_STUDENT_ENSET_2' | translate }}
                <br/><br/>
                <ngx-dropzone
		                [disabled]="model.processing"
                        (change)="onSelect($event)"
                        [style.border]="model.error ? '2px solid var(--danger)' : '2px dashed var(--tab)'"
                        [compress]="false"
                        [accept]="'image/*'"
                        [maxFileSize]="4000000">
                    <ngx-dropzone-label>
                        <img
                            src="../../../../assets/images/example-inscription-docs.png"
                            alt="example inscription docs" />
                        <h4>{{ 'DROPZONE.HEADER' | translate }}</h4>
                        <p>{{ 'DROPZONE.MAX_4MB' | translate }}</p>
                    </ngx-dropzone-label>
                </ngx-dropzone>
                <br/>
                {{ 'DIALOG.NOT_STUDENT_ENSET_3' | translate }}
                <a routerLink="/contact">{{ 'DIALOG.NOT_STUDENT_ENSET_LINK' | translate }}</a>
            </mat-card-content>
            <mat-card-actions>
                <mat-checkbox
		                [disabled]="model.processing"
		                (change)="onCheck($event)"
                        color="primary"
                        class="example-margin">
                    {{'DIALOG.NOT_STUDENT_ENSET_CHECKBOX'|translate}}
                </mat-checkbox>
            </mat-card-actions>
            <mat-card-footer *ngIf="model.processing">
		        <mat-progress-bar
			        [mode]="model.error ? 'determinate' : 'indeterminate'"
			        [color]="model.error ? 'warn' : 'primary'"
		        ></mat-progress-bar>
            </mat-card-footer>
            <button
                    mat-icon-button
                    [disabled]="model.processing"
                    color="warn"
                    class="close"
                    mat-dialog-close>
                <mat-icon>close</mat-icon>
            </button>
        </mat-card>
	`,
	styles: [`
      .processing {
        position: fixed;
        bottom: .5rem;
        right: .5rem;
        z-index: 1000;
        width: 3rem;
        height: 3rem;
        background-color: var(--tab);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ngx-dropzone {
        height: 75%;
        padding: 2rem;
        //border: 2px dashed var(--tab);
        background-color: var(--highlight);
        transition: all 0.3s ease-in-out;
        box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.3);
	      img {
	        width: 10rem;
	      }
	
	      h4 {
	        font-size: medium;
	        color: var(--text);
	        margin-bottom: .2rem;
	      }
	
	      p {
	        font-size: small;
	        color: var(--text);
	        margin: 0;
	      }

        &:hover {
          border: 2px solid var(--tab);
        }

      }
		mat-card {
            width: 100%;
		  	height: 100%;
		  	background-color: var(--highlight);
		  	position: relative;
		}
        mat-card-actions {
            display: flex;
            justify-content: space-between;
        }
        mat-card-header, mat-card-content, a {
            color: var(--text);
        }
        .close {
            position: absolute;
            top: 0;
            right: 0;
        }
        mat-card-header {
            font-size: 1.2rem;
          	font-weight: 500;
        }
        mat-card-content, a {
          margin: 1.5rem 0;
          font-size: 1rem;
          text-justify: inter-word;
        }
	`],
})
export class NotEnsetStudentDialog {
	constructor(
		private store: Store,
		public dialogRef: MatDialogRef<NotEnsetStudentDialog>,
		private service: InscriptionDocAnalyserService) {}
	model$ = new BehaviorSubject<ModelSubject>({
		processing: false,
		error: false
	});
	onSelect($event: NgxDropzoneChangeEvent) {
		const file = $event.addedFiles[0];
		if (!file) {
			this.model$.next({
				processing: false,
				error: true
			});
			return;
		}
		if (file.size > 4_000_000) {
			this.model$.next({
				processing: false,
				error: true
			});
			return;
		}
		if (!file.type.startsWith('image/')) {
			this.model$.next({
				processing: false,
				error: true
			});
			return;
		}
		this.model$.next({
			processing: true,
			error: false
		});
		this.service
			.analyze(file)
			.pipe(catchError(() => {
				this.model$.next({
					processing: false,
					error: true
				});
				return of(null);
			}))
			.subscribe((result) => {
				this.model$.next({
					processing: false,
					error: result === null
				});
				const major = result?.major;
				const promo = result?.promo;
				if (!major || !promo) {
					this.model$.next({
						processing: false,
						error: true
					});
					return;
				}
				this.store.dispatch(new AuthenticationActions.SetUserScope(`${major + promo}`));
				this.dialogRef.close();
			});
	}
	onCheck($event: MatCheckboxChange) {
		if ($event.checked) {
			localStorage.setItem('not-student-dialog-not-show', 'true');
		} else {
			localStorage.setItem('not-student-dialog-not-show', 'false');
		}
	}
}