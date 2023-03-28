/* eslint-disable */
import {
	AuthUserRecord
} from "firebase-functions/lib/common/providers/identity";
import { db } from "../index";
import { Prospect } from "./models/Prospect";
import { AppUser } from "./models/AppUser";


export const beforeUserCreateHandler = async (
	user: AuthUserRecord) => {
	const email = user.email;
	if (!email) {
		throw new Error("Email is required");
	}
	const prospect = await db
		.collection("prospects")
		.doc(email)
		.get()
		.then(snapshot => {
			if (!snapshot.exists) {
				return null;
			}
			return snapshot.data() as Prospect;
		});
	if (!prospect) {
		const appUser: AppUser =  {
			deleted: false,
			displayName: user.displayName || email.split("@")[0],
			email,
			photoUrl: user.photoURL || "",
			scope_id: "external",
			is_allowed: true
		}
		await db.collection("users").doc(user.uid).create(appUser);
		return;
	}
	if (!prospect.is_allowed) {
		throw new Error("You are not allowed to register");
	}
	const appUser: AppUser =  {
		deleted: false,
		displayName: prospect.displayName || user.displayName || email.split("@")[0],
		email,
		photoUrl: user.photoURL || "",
		scope_id: prospect.scope_id,
		is_allowed: prospect.is_allowed
	}
	await db.collection("users")
		.doc(user.uid)
		.create(appUser);
}