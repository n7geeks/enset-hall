
import { enableProdMode } from "@angular/core";
import { environment } from "./environments/environment";
import { providers } from "./configuration/providers";
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

if (environment.production) {
	enableProdMode();
}


bootstrapApplication(AppComponent, { providers })
  .catch(err => console.error(err));
