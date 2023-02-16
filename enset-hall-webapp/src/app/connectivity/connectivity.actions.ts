import { ConnectivityStatus } from "./connectivity.state";

export namespace ConnectivityActions {
	export class UpdateStatus {
		static readonly type = '[Connectivity] Update Status';
		constructor(public payload: ConnectivityStatus) { }
	}
}
