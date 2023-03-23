import { Routes } from "@angular/router";
import { AuthComponent } from "../app/authentication/components/auth.component";
import {
	AngularFireAuthGuard,
	redirectLoggedInTo,
	redirectUnauthorizedTo
} from "@angular/fire/compat/auth-guard";
import { MainComponent } from "../app/main/main.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
export const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin }
	},
	{
		path: 'login',
		component: AuthComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectLoggedInToHome }
	},
	{
		path: '**',
		redirectTo: 'login',
		pathMatch: 'full'
	}
];
