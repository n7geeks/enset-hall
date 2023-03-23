import { Routes } from "@angular/router";
import { AuthComponent } from "../app/authentication/components/auth.component";
import { HomeComponent } from "../app/home/home.component";
import {
	AngularFireAuthGuard,
	redirectLoggedInTo,
	redirectUnauthorizedTo
} from "@angular/fire/compat/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
export const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin }
	},
	{
		path: 'auth',
		component: AuthComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectLoggedInToHome }
	},
	{
		path: '**',
		redirectTo: 'auth',
		pathMatch: 'full'
	}
];
