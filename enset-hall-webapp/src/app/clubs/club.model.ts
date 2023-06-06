import {AppUser} from "../authentication/models/AppUser";

export interface Club {
	id: string;
	name: string;
	handle: string;
	logo: string;
	banner: string;
	isAdeClub: boolean;
	catchphrase: string;
	members: AppUser[];

}
