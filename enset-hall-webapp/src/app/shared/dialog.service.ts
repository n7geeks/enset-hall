import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";

@Injectable({ providedIn: 'root' })
export class DialogService {
	constructor(private dialog: MatDialog) { }
	public open(component: any) {
		this.dialog.open(component);
	}
}
