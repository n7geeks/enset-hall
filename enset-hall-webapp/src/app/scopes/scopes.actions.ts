import {Scope} from "./scopes.models";

export namespace ScopesActions {
	export class GetScopes {
		static readonly type = '[Scopes] Get';
		constructor() { }
	}
	export class SetScopes {
		static readonly type = '[Scopes] Set';
		constructor(public scopes: Scope[]) { }
	}
}
