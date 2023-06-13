import {Injectable} from "@angular/core";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, take} from "rxjs";
import {ClubRequestsActions} from "../clubs/club/requests/club-requests.actions";

@Injectable({ providedIn: "root" })
export class UploadService {
	constructor(private storage: AngularFireStorage, private afs: AngularFirestore) {}
	selectImageAndUpload(callback: (url: string) => void): void {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.onchange = (event: any) => {
			const file = input.files?.item(0);
			if (file) {
				this.uploadFile(file)
					.pipe(take(1))
					.subscribe(url => callback(url));
			}
		}
		input.click();
	}

	private uploadFile(file: File): Observable<string> {
		const filePath = `images/${this.afs.createId()}`;
		const fileRef = this.storage.ref(filePath);
		const task = this.storage.upload(filePath, file);
		return new Observable<string>(subscriber => {
			task.then(() => {
				fileRef.getDownloadURL().subscribe(url => {
					subscriber.next(url);
					subscriber.complete();
				});
			});
		});
	}
}
