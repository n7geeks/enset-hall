import {Club} from "../../club.models";

export interface CLubDialogData {
	club: Club;
	title: string;
	content: string;
	action: string;
	severity: 'warn' | 'primary' | 'accent';
	target?: string;
}
