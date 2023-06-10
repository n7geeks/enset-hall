import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {CLubDialogData} from "./dialog-data.models";

@Component({
	selector: 'club-confirm-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule, TranslateModule],
	template: `
		<h1 mat-dialog-title>{{ data.title | translate: { clubName: data.club.name, targetName: data.target }  }}</h1>
		<mat-dialog-content>
            {{ data.content | translate: { clubName: data.club.name, targetName: data.target }  }}
		</mat-dialog-content>
		<mat-dialog-actions>
			<button mat-button mat-dialog-close [mat-dialog-close]="true" (click)="dialogRef.close(false)">
                {{ 'CANCEL' | translate }}
			</button>
			<button mat-raised-button [mat-dialog-close]="true" [color]="data.severity" (click)="dialogRef.close(true)">
				{{ data.action | translate }}
			</button>
		</mat-dialog-actions>
	`,
	styles: [`
		.mat-mdc-dialog-actions {
			justify-content: flex-end;
		}
	`]
})
export class ClubConfirmDialog {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: CLubDialogData,
		public dialogRef: MatDialogRef<ClubConfirmDialog>
	) {}
}
