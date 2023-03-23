export interface AuthUser {
	uid: string;
	email: string;
	ensetien: boolean;
	displayName: string;
	deleted: boolean;
	photoUrl?: string;
	scopes: string[];
}
