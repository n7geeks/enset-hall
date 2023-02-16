import { Action, Selector, State } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ConnectivityActions } from "./connectivity.actions";

export enum ConnectivityStatus {
	Online = "online",
	Offline = "offline"
}

@State<ConnectivityStatus>({
	name: "connectivity",
	defaults: ConnectivityStatus.Offline
})
@Injectable()
export class ConnectivityState {
	constructor() {}
	@Action(ConnectivityActions.UpdateStatus)
	updateStatus(ctx: any, action: ConnectivityActions.UpdateStatus) {
		ctx.setState(action.payload);
	}
	@Selector()
	static isOnline(state: ConnectivityStatus) {
		return state === ConnectivityStatus.Online;
	}
}
