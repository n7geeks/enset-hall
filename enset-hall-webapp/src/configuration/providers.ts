import { EnvironmentProviders, importProvidersFrom, isDevMode } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { NgxsModule } from "@ngxs/store";
import { states, storage } from "./states";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "../environments/environment";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireAuthGuardModule } from "@angular/fire/compat/auth-guard";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {MatBottomSheet, MatBottomSheetModule} from "@angular/material/bottom-sheet";

const modules = [
	ServiceWorkerModule.register('ngsw-worker.js', {
		enabled: !isDevMode(),
		registrationStrategy: 'registerWhenStable:30000'
	}),
	AngularFireAuthGuardModule,
	AngularFireModule.initializeApp(environment.firebaseConfig),
	AngularFireAuthModule,
	AngularFirestoreModule,
	MatNativeDateModule,
	MatBottomSheetModule,
	MatSnackBarModule,
	NgxsModule.forRoot(states),
	NgxsStoragePluginModule.forRoot(storage),
	NgxsReduxDevtoolsPluginModule.forRoot(),
	RouterModule.forRoot(routes, {
		scrollPositionRestoration: 'enabled'
	}),
	MatDialogModule,
	HttpClientModule,
	TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useFactory: (http: HttpClient) =>
				new TranslateHttpLoader(http),
			deps: [HttpClient]
		},
	})
];
export const providers: EnvironmentProviders[] = [
	importProvidersFrom(modules),
	importProvidersFrom(BrowserAnimationsModule)
];
