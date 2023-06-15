import { Component, EventEmitter, Output } from "@angular/core";
import { UsersService } from "../../../services/users.service";
import { Observable } from "rxjs";
import { User } from "../../../models/users.model";

@Component({
  selector: "ngx-choose-godfather",
  templateUrl: "./choose-godfather.component.html",
})
export class ChooseGodfatherComponent {
  users$: Observable<User[]> = null;
  selectedUser: User = null;

  @Output() godfatherSelected: EventEmitter<User> = new EventEmitter<User>();

  constructor(private usersService: UsersService) {}

  selectUser(user: User) {
    this.selectedUser = user;
    this.godfatherSelected.emit(user);
  }

  loadUsers(email: string) {
    if (email.length > 0) {
      this.users$ = this.usersService.findUsersByEmail(email);
    }
  }
}
