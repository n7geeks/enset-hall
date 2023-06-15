import { Component } from "@angular/core";
import { Club } from "../../models/clubs.model";
import { ClubsService } from "../../services/clubs.service";
import { User } from "../../models/users.model";

@Component({
  selector: "ngx-clubs",
  templateUrl: "./clubs.component.html",
})
export class ClubsComponent {
  settings = {
    columns: {
      logo: {
        title: "Logo",
        type: "html",
        sort: false,
        width: "50px",
        valuePrepareFunction: (logo: string) => {
          return `<img src="${logo}" width="50" height="50" />`;
        },
      },
      name: {
        title: "Nom",
        type: "string",
        sort: false,
      },
      about: {
        title: "A propos",
        type: "string",
        sort: false,
        valuePrepareFunction: (about: string) => {
          return about.slice(0, 50) + (about.length > 50 ? " ..." : "");
        },
      },
      godfather: {
        title: "Parrain",
        type: "string",
        sort: false,
        valuePrepareFunction: (godfather: User) => {
          return godfather.displayName;
        },
      },
    },
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

  constructor(private clubsService: ClubsService) {}

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
    console.log(club);
  }
}
