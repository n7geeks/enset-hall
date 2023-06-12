import {Component} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
    selector: 'n7h-add-activity-bottom-sheet',
    template: `
		<form [formGroup]="form">
			<h1>{{ 'CLUBS.NEW_ACTIVITY' | translate }}</h1>
			<mat-form-field appearance="outline">
				<mat-label>{{ 'CLUBS.ACTIVITY_TYPE' | translate }}</mat-label>
				<mat-select formControlName="type">
					<mat-option value="workshop">{{ 'WORKSHOP' | translate }}</mat-option>
					<mat-option value="training">{{ 'TRAINING' | translate }}</mat-option>
				</mat-select>
			</mat-form-field>
			<mat-form-field appearance="outline">
				<mat-label>{{ 'CLUBS.ACTIVITY_TITLE' | translate }}</mat-label>
				<input matInput formControlName="title" />
			</mat-form-field>
			<mat-form-field appearance="outline">
				<mat-label>{{ 'CLUBS.ACTIVITY_DESCRIPTION' | translate }}</mat-label>
				<textarea matInput formControlName="description"></textarea>
			</mat-form-field>
			<mat-form-field appearance="outline">
				<mat-label>{{ 'CLUBS.ACTIVITY_START_DATE' | translate }}</mat-label>
				<input
					matInput
					[matDatepicker]="startDatePicker"
					formControlName="startDate" />
				<mat-datepicker-toggle matSuffix [for]="startDatePicker"></mat-datepicker-toggle>
				<mat-datepicker #startDatePicker></mat-datepicker>
			</mat-form-field>
			<mat-form-field appearance="outline">
				<mat-label>{{ 'CLUBS.ACTIVITY_END_DATE' | translate }}</mat-label>
				<input matInput [matDatepicker]="endDatePicker" formControlName="endDate" />
				<mat-datepicker-toggle matSuffix [for]="endDatePicker"></mat-datepicker-toggle>
				<mat-datepicker #endDatePicker></mat-datepicker>
			</mat-form-field>
			<button mat-raised-button color="primary">{{ 'CLUBS.ADD_ACTIVITY' | translate }}</button>
		</form>
	`,
    styles: [`
		form {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			padding: 1rem;
			mat-form-field {
				width: 100%;
			}
		}
	`],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatSelectModule,
        TranslateModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule
    ],
})
export class AddActivityBottomSheet {
    constructor(private bottomSheetRef: MatBottomSheetRef<AddActivityBottomSheet>) {}
    form = new FormGroup({
        type: new FormControl<'workshop'|'training'>('workshop'),
        title: new FormControl<string>(''),
        description: new FormControl<string>(''),
        startDate: new FormControl<Date>(new Date()),
        endDate: new FormControl<Date>(new Date()),
    });

}