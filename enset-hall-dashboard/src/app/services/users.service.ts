import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { User } from "../models/users.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private store: AngularFirestore) {}

  getAll(): Observable<User[]> {
    return this.store
      .collection<User>("users", (ref) => ref.where("deleted", "==", false))
      .valueChanges({
        idField: "id",
      });
  }

  findUsersByEmail(email: string): Observable<User[]> {
    return this.store
      .collection<User>("users", (ref) =>
        ref.where("email", ">=", email).where("email", "<=", email + "\uf8ff")
      )
      .valueChanges({
        idField: "id",
      });
  }

  update(id: string, data: Partial<User>): void {
    this.store.collection("users").doc(id).update(data);
  }
}
