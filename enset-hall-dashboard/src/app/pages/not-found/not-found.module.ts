import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbButtonModule, NbCardModule } from "@nebular/theme";
import { NotFoundComponent } from "./not-found.component";

@NgModule({
  imports: [CommonModule, NbCardModule, NbButtonModule],
  declarations: [NotFoundComponent],
})
export class NotFoundModule {}
