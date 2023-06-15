import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClubsComponent } from "./clubs.component";
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { AssignGodfatherModalComponent } from "./assign-godfather-modal/assign-godfather-modal.component";
import { UserRadioButtonCardComponent } from "./user-radio-button-card/user-radio-button-card.component";
import { CreateClubFormComponent } from "./create-club-form/create-club-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ChooseGodfatherComponent } from './choose-godfather/choose-godfather.component';

@NgModule({
  declarations: [
    ClubsComponent,
    AssignGodfatherModalComponent,
    UserRadioButtonCardComponent,
    CreateClubFormComponent,
    ChooseGodfatherComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbDialogModule,
    NbInputModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NbIconModule,
  ],
})
export class ClubsModule {}
