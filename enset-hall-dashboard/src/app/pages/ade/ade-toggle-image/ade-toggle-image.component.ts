import { Component, Input } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { Club } from "../../../models/clubs.model";
import { ClubsService } from "../../../services/clubs.service";

@Component({
  selector: "ngx-ade-toggle-image",
  templateUrl: "./ade-toggle-image.component.html",
  styleUrls: ["./ade-toggle-image.component.scss"],
})
export class AdeToggleImageComponent implements ViewCell {
  @Input() value: string | number;
  @Input() rowData: Club;

  constructor(private clubsService: ClubsService) {}

  toggleAde() {
    if (confirm("Voulez-vous vraiment changer le statut de ce club ?")) {
      this.clubsService.toggleAdeClub(this.rowData.id, !this.rowData.isAdeClub);
    }
  }
}
