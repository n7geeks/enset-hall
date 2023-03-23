/* eslint-disable */
import {
  AuthEventContext,
  AuthUserRecord } from "firebase-functions/lib/common/providers/identity";

export const beforeUserSignInHandler = (
	user: AuthUserRecord,
	context: AuthEventContext) => {
}