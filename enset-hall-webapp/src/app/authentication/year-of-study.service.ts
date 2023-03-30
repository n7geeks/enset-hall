import { Injectable } from "@angular/core";
import { Diploma } from "./models/UserScopes";

@Injectable({ providedIn: "root" })
export class YearOfStudyService {
	private readonly currentYear: number;
	private readonly currentMonth: number;
	private maxYearOfStudy = {
		"engineering": 3,
		"dut": 2,
		"lep": 1,
		"master": 2
	};

	constructor() {
		this.currentYear = new Date().getFullYear();
		this.currentMonth = new Date().getMonth() + 1;
	}

	getYearOfStudy(promo: number, diploma: Diploma): number {
		const x = this.currentYear - promo;
		if (x >= this.maxYearOfStudy[diploma]) {
			return this.maxYearOfStudy[diploma];
		}
		if (this.currentMonth > 10) {
			return x + 1;
		}
		return x;
	}
}
