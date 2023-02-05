import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
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

const modules = [
	NgxsModule.forRoot(states),
	NgxsStoragePluginModule.forRoot(storage),
	NgxsReduxDevtoolsPluginModule.forRoot(),
	AngularFireModule.initializeApp(environment.firebaseConfig),
	AngularFireAuthModule,
	AngularFirestoreModule,
	RouterModule.forRoot(routes),
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
