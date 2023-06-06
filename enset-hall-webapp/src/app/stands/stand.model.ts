import {Club} from "../clubs/club.model";
import {AppUser} from "../authentication/models/AppUser";

export interface Stand {
	id: string;
	subject: string;
	club: Club;
	organizers: AppUser[];
	link: string;
}
