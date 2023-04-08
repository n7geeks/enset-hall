import { Component, NgZone } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngxs/store";
import { AuthenticationActions } from "../authentication/state/authentication.actions";
import { AuthUser } from "../authentication/models/AuthUser";
import { FormsModule } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;


@Component({
	selector: 'n7h-home',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule
	],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	constructor(private store: Store, private angularFireAuth: AngularFireAuth) {}
		protected user$ = this.store.select<AuthUser>(state => state.authentication.user);
	signOut() {
		this.store.dispatch(new AuthenticationActions.SignOut());
	}
}
