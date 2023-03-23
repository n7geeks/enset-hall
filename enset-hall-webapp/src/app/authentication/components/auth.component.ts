import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ChangeLanguageWidgetComponent } from "../../user-preferences/components/change-language-widget.component";
import { ToggleThemeWidgetComponent } from "../../user-preferences/components/toggle-theme-widget.component";
import { Select } from "@ngxs/store";
import { ConnectivityState, ConnectivityStatus } from "../../connectivity/connectivity.state";
import { Observable } from "rxjs";
import { ContinueWithGoogleButtonComponent } from "./ui/continue-with-google-button";
import { TosAndPpAcceptanceDisclaimerComponent } from "./ui/tos-and-pp-acceptance-disclaimer";
import { FooterComponent } from "../../footer/footer.component";

@Component({
	selector: 'n7h-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss', "./auth.component.m.scss"],
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		ChangeLanguageWidgetComponent,
		ToggleThemeWidgetComponent,
		ContinueWithGoogleButtonComponent,
		TosAndPpAcceptanceDisclaimerComponent,
		FooterComponent
	]
})
export class AuthComponent {
}
