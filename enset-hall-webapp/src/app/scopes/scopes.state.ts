import {Action, State, StateContext} from "@ngxs/store";
import {Scope} from "./scopes.models";
import {Injectable} from "@angular/core";
import {ScopesActions} from "./scopes.actions";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@State<Scope[]>({
	name: 'scopes',
	defaults: []
})
@Injectable()
export class ScopesState {
	constructor(private afs: AngularFirestore) {}
	@Action(ScopesActions.GetScopes)
	getScopes(ctx: StateContext<Scope[]>, action: ScopesActions.GetScopes) {
		this.afs.collection<Scope>('scopes')
			.valueChanges({idField: 'id'})
			.subscribe(scopes => {
			ctx.dispatch(new ScopesActions.SetScopes(scopes));
		});
	}

	@Action(ScopesActions.SetScopes)
	setScopes(ctx: StateContext<Scope[]>, action: ScopesActions.SetScopes) {
		ctx.setState(action.scopes);
	}
}
