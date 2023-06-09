import {AppUser} from "../../../authentication/models/AppUser";

export interface FirebaseClubRequest {
	id: string;
	clubId: string;
	requesterId: string;
	resolved: boolean;
	resolvedBy?: string;
	resolvedAt?: string;
	createdAt: string;
}

export interface ClubRequest extends FirebaseClubRequest {
	requester?: AppUser;
}

export interface ClubRequestsStateModel {
	[clubId: string]: ClubRequest[];
}
