export namespace StandsActions {
	export class FetchStands {
		static readonly type = "[Stands] Fetch Stands";
		constructor() {}
	}
	export class SubmitDiscussion {
		static readonly type = "[Stands] Submit Discussion";
		constructor(public standId: string, public content: string) {}
	}
}