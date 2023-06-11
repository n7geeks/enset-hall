import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Club} from "../../club.models";
import {Store} from "@ngxs/store";
import {ClubRequestsActions} from "../requests/club-requests.actions";

export interface ClubNewNameDialogData {
	club: Club;
	target: 'name' | 'catchphrase';
}

@Component({
	selector: 'n7h-club-rename-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatInputModule,
		MatButtonModule,
		CommonModule,
		TranslateModule,
		ReactiveFormsModule
	],
	template: `
		<h1 mat-dialog-title>
			{{ 'CLUBS.REAMING_' + data.target.toUpperCase() + '_TITLE'  | translate: { clubName: data.club.name } }}
		</h1>
		<div mat-dialog-content>
			<p>
				{{ 'CLUBS.REAMING_' + data.target.toUpperCase() + '_CONTENT'  | translate: { clubName: data.club.name } }}
			</p>
			<form class="form" [formGroup]="form">
				<mat-form-field class="full-width" appearance="outline">
					<mat-label>{{ 'CLUBS.REAMING_' + data.target.toUpperCase() + '_LABEL'  | translate }}</mat-label>
					<input formControlName="name"  matInput maxlength="256">
				</mat-form-field>
			</form>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="onNoClick()">{{ 'CANCEL' | translate }}</button>
			<button
				mat-raised-button
				[disabled]="!form.valid || form.value.name === originalName"
				(click)="rename()"
				cdkFocusInitial color="primary">
				{{ 'CLUBS.REAMING_ACTION' | translate }}
			</button>
		</div>
	`,
	styles: [`
		.mat-mdc-dialog-actions {
			justify-content: flex-end;
		}
		.form {
			min-width: 150px;
			max-width: 500px;
			width: 100%;
		}

		.full-width {
			width: 100%;
		}
	`]
})
export class ClubRenameDialog {
	name: string = '';
	originalName: string = this.data.club[this.data.target];
	public dialogRef: MatDialogRef<ClubRenameDialog>;
	form = new FormGroup({
		name: new FormControl(this.originalName, [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(256)
		])
	});
	constructor(
		dialogRef: MatDialogRef<ClubRenameDialog>,
		@Inject(MAT_DIALOG_DATA) public data: ClubNewNameDialogData) {
		this.dialogRef = dialogRef;
	}

	onNoClick(): void {
		this.dialogRef.close({
			newName: undefined,
			resolved: false
		});
	}

	rename() {
		if (this.form.valid && this.form.value.name !== this.originalName) {
			this.dialogRef.close({
				newName: this.form.value.name,
				resolved: true
			});
		} else {
			this.form.markAllAsTouched();
		}
	}
}
