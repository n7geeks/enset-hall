/* eslint-disable */
import { Prospect } from "./Prospect";

export interface AppUser extends Prospect {
	deleted: boolean;
	displayName: string;
	email: string;
	photoUrl: string;
}