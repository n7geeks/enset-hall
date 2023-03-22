import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class AlertService {
	private duration = 5000;
	constructor(
		private _snackBar: MatSnackBar,
		private zone: NgZone
	) { }
	public showSuccess(message: string) {
		this._snackBar.open(
			message,
			"OK", {
			duration: this.duration,
			verticalPosition: "bottom",
			horizontalPosition: 'left',
			panelClass: 'alert-success',
		});
	}
	public showError(message: string) {
		this._snackBar.open(
			message,
			"OK", {
			duration: this.duration,
			verticalPosition: "bottom",
			horizontalPosition: 'left',
			panelClass: 'alert-error',
		});
	}
}
