import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SupportedLang, SupportedTheme } from "./types";

@Injectable({ providedIn: 'root' })
export class UserPreferencesService {
	DEFAULT_LANG: SupportedLang = 'fr';
	DEFAULT_THEME: SupportedTheme = 'dark';
	constructor(
		private translateService: TranslateService,
	) {}
	public setLang(lang: SupportedLang = this.DEFAULT_LANG) {
		this.translateService.use(lang);
	}
	public setTheme(theme: SupportedTheme = this.DEFAULT_THEME) {
		document.body.setAttribute('theme', theme);
	}
}
