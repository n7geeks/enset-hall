import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users.component";
import { NbCardModule } from "@nebular/theme";

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, NbCardModule],
})
export class UsersModule {}
