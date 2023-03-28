import { UserScopes } from "./UserScopes";

export interface AuthUser {
	uid: string;
	email: string;
	displayName: string;
	deleted: boolean;
	photoUrl?: string;
	scopes: UserScopes;
}
