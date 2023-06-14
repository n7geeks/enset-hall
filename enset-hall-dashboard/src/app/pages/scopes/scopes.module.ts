import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScopesComponent } from "./scopes.component";
import { NbCardModule } from "@nebular/theme";

@NgModule({
  declarations: [ScopesComponent],
  imports: [CommonModule, NbCardModule],
})
export class ScopesModule {}
