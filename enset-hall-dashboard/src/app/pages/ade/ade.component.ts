import { Component } from "@angular/core";
import { ClubsService } from "../../services/clubs.service";
import { NbDialogService } from "@nebular/theme";
import { columns } from "../../shared/clubs-table-columns";
import { Club } from "../../models/clubs.model";
import { AdeToggleImageComponent } from "./ade-toggle-image/ade-toggle-image.component";

@Component({
  selector: "ngx-ade",
  templateUrl: "./ade.component.html",
})
export class AdeComponent {
  settings = {
    columns: {
      ...columns,
      isAdeClub: {
        title: "ADE Club",
        type: "custom",
        sort: false,
        width: "50px",
        renderComponent: AdeToggleImageComponent,
      },
    },
    actions: {
      position: "right",
      add: false,
      edit: false,
      delete: false,
    },
    hideSubHeader: true,
  };

  clubs$ = this.clubsService.getAll();

  constructor(private clubsService: ClubsService) {}
}
