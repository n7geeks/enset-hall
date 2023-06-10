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
	godfather: AppUser;
	chapters: ClubChapter[];
}

export interface ClubActivity {
	id: string;
	type: string;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
}

export interface ClubChapter {
	year: number;
	officeMembers: ClubOfficeMember[];
	members: AppUser[];
	activities: ClubActivity[];
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
