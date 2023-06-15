import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Club } from "../models/clubs.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "../models/users.model";

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

  create(club: Club) {
    return this.store.collection("clubs").add(club);
  }

  assignGodfather(clubId: string, godfather: User) {
    return this.store
      .collection("clubs")
      .doc(clubId)
      .update({ godfather: godfather });
  }

  toggleAdeClub(clubId: string, isAdeClub: boolean) {
    return this.store
      .collection("clubs")
      .doc(clubId)
      .update({ isAdeClub: isAdeClub });
  }
}
