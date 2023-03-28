/* eslint-disable */
import { Prospect } from "./Prospect";

export interface AppUser extends Prospect {
	deleted: boolean;
	email: string;
	photoUrl: string;
}