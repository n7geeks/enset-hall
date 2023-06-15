import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users.component";
import { NbCardModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, NbCardModule, Ng2SmartTableModule],
})
export class UsersModule {}
