import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClubsComponent } from "./clubs.component";
import { NbCardModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { AssignGodfatherModalComponent } from './assign-godfather-modal/assign-godfather-modal.component';

@NgModule({
  declarations: [ClubsComponent, AssignGodfatherModalComponent],
  imports: [CommonModule, NbCardModule, Ng2SmartTableModule],
})
export class ClubsModule {}
