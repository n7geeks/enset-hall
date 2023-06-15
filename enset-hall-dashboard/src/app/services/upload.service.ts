import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({ providedIn: "root" })
export class UploadService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  public uploadFile(file: File): Promise<string> {
    if (!file) {
      return Promise.resolve(null);
    }

    const filePath = `images/${this.afs.createId()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Promise((resolve, reject) => {
      task
        .then(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            resolve(url);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
