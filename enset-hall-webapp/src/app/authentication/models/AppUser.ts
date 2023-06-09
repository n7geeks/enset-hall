export interface AppUser {
	id: string;
	deleted: boolean;
	email: string;
	photoUrl: string;
	displayName: string;
	is_allowed: boolean;
	scope_id: string;
}

export interface ClubOfficeMember extends AppUser {
	title: string;
}
