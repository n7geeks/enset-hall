import {AppUser, ClubOfficeMember} from "../authentication/models/AppUser";

export interface StatelessClub {
	id: string;
	name: string;
	handle: string;
	logo: string;
	banner: string;
	isAdeClub: boolean;
	catchphrase: string;
	about: string;
	isOpen: boolean;
	chapters: ClubChapter[];
}

export interface ClubChapter {
	year: number;
	officeMembers: ClubOfficeMember[];
	members: AppUser[];
}

export interface Club extends StatelessClub, UserClubState {}

export interface UserClubState {
	isMember: boolean;
	isOfficeMember: boolean;
	isGodfather: boolean;
	isPending: boolean;
}

export interface UserClubsData {
	[clubId: string]: UserClubState;
}
