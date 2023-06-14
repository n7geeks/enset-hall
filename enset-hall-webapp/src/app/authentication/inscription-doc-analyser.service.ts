import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FileExtended} from "ngx-dropzone-compressing/lib/ngx-dropzone.service";
import {take} from "rxjs";

export const INSCRIPTION_DOC_ANALYSER_SERVER =
	'https://n7h-scolarity-service.azurewebsites.net/analyze';

export interface InscriptionDocAnalyserResponse {
	fullName: string,
	cne: string,
	cin: string,
	promo: string,
	major: string,
	department: string,
	diploma: string,
	formation: string
}

@Injectable({ providedIn: 'root' })
export class InscriptionDocAnalyserService {
	constructor(private http: HttpClient) {}
	analyze(file: FileExtended) {
		const formData = new FormData();
		formData.append('file', file, file.name);
		return this.http
			.post<InscriptionDocAnalyserResponse>(INSCRIPTION_DOC_ANALYSER_SERVER, formData)
			.pipe(take(1))
	}
}