/* eslint-disable */
import {
	AuthEventContext,
	AuthUserRecord
} from "firebase-functions/lib/common/providers/identity";
import { Prospect } from "./models/Prospect";
import { User } from "./models/User";
import { db } from "../index";


export const beforeUserCreateHandler = async (
	user: AuthUserRecord,
	context: AuthEventContext) => {
	const email = user.email;
	if (!email) {
		throw new Error("Email is required");
	}
	if (!isInstitutionalEmail(email)) {
		const appUser: User =  {
			ensetien: false,
			deleted: false,
		}
		await db.collection("users").doc(user.uid).create(appUser);
		return;
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
		const appUser: User =  {
			ensetien: false,
			deleted: false
		}
		await db.collection("users").doc(user.uid).create(appUser);
		return;
	}
	if (!prospect.allowed) {
		throw new Error("You are not allowed to register");
	}
	if (prospect.linked) {
		throw new Error("This account is already linked");
	}
	await db
		.collection("prospects")
		.doc(email)
		.update({ linked: true });
	const appUser: User =  {
		ensetien: true,
		deleted: false
	}
	await db.collection("users").doc(user.uid).create(appUser);
}

function isInstitutionalEmail(email: string) {
	const institutionalDomains = [
		"etu.enset-media.ac.ma",
		"enset-media.ac.ma"
	];
	const domain = email.split("@")[1];
	return institutionalDomains.includes(domain);
}