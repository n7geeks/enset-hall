/* eslint-disable */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { beforeUserCreateHandler } from "./auth/beforeUserCreateHandler";
import { beforeUserSignInHandler } from "./auth/beforeUserSignInHandler";
import { onUserDeleteHandler } from "./auth/beforeUserDeleteHandler";

admin.initializeApp();
export const db = admin.firestore();
export const beforeUserCreate = functions.auth.user().beforeCreate(beforeUserCreateHandler);
export const beforeUserSignIn = functions.auth.user().beforeSignIn(beforeUserSignInHandler);
export const onUserDelete = functions.auth.user().onDelete(onUserDeleteHandler);
// export const linkAccount = functions.https.onCall(async (data, context) => {
// 	// const { id, institutionalEmail } = data;
// });