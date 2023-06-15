import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClubsComponent } from "./clubs.component";
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbInputModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { AssignGodfatherModalComponent } from "./assign-godfather-modal/assign-godfather-modal.component";
import { UserRadioButtonCardComponent } from './user-radio-button-card/user-radio-button-card.component';

@NgModule({
  declarations: [ClubsComponent, AssignGodfatherModalComponent, UserRadioButtonCardComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbDialogModule,
    NbInputModule,
    NbButtonModule,
  ],
})
export class ClubsModule {}
