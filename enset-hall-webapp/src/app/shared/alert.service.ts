import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

@Injectable({ providedIn: 'root' })
export class AlertService {
	private duration = 5000;
	constructor(
		private _snackBar: MatSnackBar,
		private translateService: TranslateService
	) { }
	public showSuccess(message: string) {
		this._snackBar.open(
			this.translateService.instant(message),
			"OK", {
			duration: this.duration,
			verticalPosition: "bottom",
			horizontalPosition: 'left',
			panelClass: 'alert-success',
		});
	}
	public showError(message: string) {
		this._snackBar.open(
			this.translateService.instant(message),
			"OK", {
			duration: this.duration,
			verticalPosition: "bottom",
			horizontalPosition: 'left',
			panelClass: 'alert-error',
		});
	}
}
