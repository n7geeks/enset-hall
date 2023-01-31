import { importProvidersFrom } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { NgxsModule } from "@ngxs/store";
import { states } from "./states";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "../environments/environment";

const modules: any[] = [
	NgxsModule.forRoot(states),
	NgxsReduxDevtoolsPluginModule.forRoot(),
	AngularFireModule.initializeApp(environment.firebaseConfig),
	AngularFireAuthModule,
	AngularFirestoreModule,
	RouterModule.forRoot(routes),
	BrowserAnimationsModule,
];

export const providers: any[] = [
	importProvidersFrom(modules)
];
