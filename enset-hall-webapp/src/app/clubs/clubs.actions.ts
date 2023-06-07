import {Club} from "./club.models";

export namespace ClubsActions {
	export class GetClubs {
		static readonly type = '[Clubs] Get';
		constructor() { }
	}
	export class SetClubs {
		static readonly type = '[Clubs] Set';
		constructor(public clubs: Club[]) { }
	}
}
