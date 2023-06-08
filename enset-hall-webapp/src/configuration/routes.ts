import { Routes } from "@angular/router";
import { AuthComponent } from "../app/authentication/components/auth.component";
import {
	AngularFireAuthGuard,
	redirectLoggedInTo,
	redirectUnauthorizedTo
} from "@angular/fire/compat/auth-guard";
import { MainComponent } from "../app/main/main.component";
import { SettingsComponent } from "../app/settings/settings.component";
import { ProfilesComponent } from "../app/profiles/profiles.component";
import { AccountSettingsComponent } from "../app/settings/components/account-settings.component";
import { NotificationsSettingsComponent } from "../app/settings/components/notifications-settings.component";
import { PreferencesSettingsComponent } from "../app/settings/components/preferences-settings.component";
import { AdvancedSettingsComponent } from "../app/settings/components/advanced-settings.component";
import {HomeComponent} from "../app/home/home.component";
import {ClubsComponent} from "../app/clubs/clubs.component";
import {ClubComponent} from "../app/clubs/club/club.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
export const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin },
		children: [
			{ path: 'home', component: HomeComponent },
			{ path: 'clubs', component: ClubsComponent },
			{ path: 'clubs/:handle/:tab', component: ClubComponent },
			{ path: 'clubs/:handle', redirectTo: 'clubs/:handle/posts', pathMatch: 'full' },
			{ path: 'settings', component: SettingsComponent, children: [
					{ path: 'account', component: AccountSettingsComponent },
					{ path: 'notifications', component: NotificationsSettingsComponent },
					{ path: 'preferences', component: PreferencesSettingsComponent },
					{ path: 'advanced', component: AdvancedSettingsComponent },
					{ path: '', redirectTo: 'account', pathMatch: 'full' }
				]
			},
			{
				path: 'profiles/:id',
				component: ProfilesComponent,
				canActivate: [AngularFireAuthGuard],
				data: { authGuardPipe: redirectUnauthorizedToLogin }
			}
		]
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
