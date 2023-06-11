import {ClubRequest} from "./club-requests.models";

export namespace ClubRequestsActions {
	export class GetClubRequests {
		static readonly type = "[ClubRequests] Get Club Requests";
		constructor(public clubId: string) {}
	}
	export class SetClubRequests {
		static readonly type = "[ClubRequests] Set Club Requests";
		constructor(public requests: ClubRequest[], public clubId: string) {}
	}
	export class AddClubRequest {
		static readonly type = "[ClubRequests] Add Club Request";
		constructor(public clubId: string) {}
	}
	export class CancelClubRequest {
		static readonly type = "[ClubRequests] Cancel Club Request";
		constructor(public clubId: string) {}
	}
	export class RejectClubRequest {
		static readonly type = "[ClubRequests] Reject Club Request";
		constructor(public requestId: string) {}
	}
	export class AcceptClubRequest {
		static readonly type = "[ClubRequests] Accept Club Request";
		constructor(public requestId: string) {}
	}

	export class LeaveClub {
		static readonly type = "[ClubRequests] Leave Club";
		constructor(public clubId: string) {}
	}

	export class KickMember {
		static readonly type = "[ClubRequests] Kick Member";
		constructor(public clubId: string, public memberId: string) {}
	}

	export class RenameClub {
		static readonly type = "[ClubRequests] Rename Club";
		constructor(public clubId: string, public newName: string) {}
	}

	export class ChangeClubCatchphrase {
		static readonly type = "[ClubRequests] Change Club Catchphrase";
		constructor(public clubId: string, public newCatchphrase: string) {}
	}

}
