import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdeComponent } from "./ade.component";
import { NbCardModule } from "@nebular/theme";

@NgModule({
  declarations: [AdeComponent],
  imports: [CommonModule, NbCardModule],
})
export class AdeModule {}
