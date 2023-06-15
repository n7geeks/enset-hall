import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { User } from "../models/users.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private store: AngularFirestore) {}

  findUsersByEmail(email: string): Observable<User[]> {
    return this.store
      .collection<User>("users", (ref) =>
        ref.where("email", ">=", email).where("email", "<=", email + "\uf8ff")
      )
      .valueChanges({
        idField: "id",
      });
  }
}
