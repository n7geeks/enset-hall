import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(private angularFireAuth: AngularFireAuth) {}
	public isAuthenticated(): boolean {
		return this.angularFireAuth.authState !== null;
	}
}
