import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SupportedLang, SupportedTheme } from "./types";
import { Store } from "@ngxs/store";

@Injectable({ providedIn: 'root' })
export class UserPreferencesService {
	DEFAULT_LANG: SupportedLang = 'fr';
	DEFAULT_THEME: SupportedTheme = 'dark';
	constructor(
		private store: Store,
		private translateService: TranslateService,
	) {}
	public initLang(lang: SupportedLang = this.DEFAULT_LANG) {
		this.translateService.use(lang);
	}
	public updateLang(lang: SupportedLang) {
		this.translateService.use(lang);
	}
}
