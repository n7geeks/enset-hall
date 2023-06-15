import { Component } from "@angular/core";
import { Club } from "../../models/clubs.model";
import { ClubsService } from "../../services/clubs.service";
import { NbDialogService } from "@nebular/theme";
import { AssignGodfatherModalComponent } from "./assign-godfather-modal/assign-godfather-modal.component";
import { columns } from "../../shared/clubs-table-columns";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-clubs",
  templateUrl: "./clubs.component.html",
})
export class ClubsComponent {
  settings = {
    columns: columns,
    actions: {
      position: "right",
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: "assign-godfather",
          title: '<i class="nb-person"></i>',
        },
      ],
    },
    hideSubHeader: true,
  };

  clubs$ = this.clubsService.getAll();

  constructor(
    private clubsService: ClubsService,
    private dialogService: NbDialogService,
    private router: Router
  ) {}
  ) { }

  handleCustomAction(event: any) {
    switch (event.action) {
      case "assign-godfather":
        this.openAssignGodfatherModal(event.data);
        break;
      default:
        break;
    }
  }

  openAssignGodfatherModal(club: Club) {
    this.dialogService.open(AssignGodfatherModalComponent, {
      context: {
        club,
      },
    });
  }

  createClub() {
    this.router.navigate(["/clubs/create"]);
  }
}
