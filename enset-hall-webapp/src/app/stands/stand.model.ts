import {StatelessClub} from "../clubs/club.models";
import {AppUser} from "../authentication/models/AppUser";

export interface Stand {
	id: string;
	subject: string;
	club: StatelessClub;
	organizers: AppUser[];
	link: string;
}
