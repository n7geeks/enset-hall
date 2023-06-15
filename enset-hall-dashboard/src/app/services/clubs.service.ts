import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Club } from "../models/clubs.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class ClubsService {
  constructor(private store: AngularFirestore) {}

  getAll(): Observable<Club[]> {
    return this.store.collection<Club>("clubs").valueChanges({
      idField: "id",
    });
  }
}