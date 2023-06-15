import { Component, Input } from "@angular/core";
import { NbDialogRef, NbToastrService } from "@nebular/theme";
import { Club } from "../../../models/clubs.model";
import { Observable } from "rxjs";
import { User } from "../../../models/users.model";
import { UsersService } from "../../../services/users.service";
import { ClubsService } from "../../../services/clubs.service";

@Component({
  selector: "ngx-assign-godfather-modal",
  templateUrl: "./assign-godfather-modal.component.html",
})
export class AssignGodfatherModalComponent {
  @Input() club: Club;

  users$: Observable<User[]> = null;
  godfather: User = null;

  constructor(
    protected ref: NbDialogRef<AssignGodfatherModalComponent>,
    private usersService: UsersService,
    private clubsService: ClubsService,
    private toastr: NbToastrService
  ) {}

  loadUsers(email: string) {
    if (email.length > 0) {
      this.users$ = this.usersService.findUsersByEmail(email);
    }
  }

  selectUser(user: User) {
    this.godfather = user;
  }

  submit() {
    if (this.godfather) {
      this.clubsService
        .assignGodfather(this.club.id, this.godfather)
        .then(() => {
          this.ref.close();
        });

      this.toastr.success(
        `Le parrain ${this.godfather.displayName} a été assigné au club ${this.club.name}`
      );
    }
    this.ref.close();
  }

  cancel() {
    this.ref.close();
  }
}
