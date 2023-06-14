import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClubsComponent } from "./clubs.component";
import { NbCardModule } from "@nebular/theme";

@NgModule({
  declarations: [ClubsComponent],
  imports: [CommonModule, NbCardModule],
})
export class ClubsModule {}
