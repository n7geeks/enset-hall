import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Scope } from "../models/scopes.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class ScopesService {
  constructor(private store: AngularFirestore) {}

  getAll(): Observable<Scope[]> {
    return this.store.collection<Scope>("scopes").valueChanges({
      idField: "id",
    });
  }

  create(scope: Scope) {
    this.store.collection("scopes").doc(scope.id).set(scope);
  }

  update(scopeId: string, scope: Scope) {
    delete scope.id;
    this.store.collection("scopes").doc(scopeId).update(scope);
  }

  delete(scopeId: string) {
    // Delete scope
    this.store.collection("scopes").doc(scopeId).delete();

    // Update related users
    this.store
      .collection("users", (ref) => ref.where("scope_id", "==", scopeId))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            scope_id: "external",
          });
        });
      });
  }
}
