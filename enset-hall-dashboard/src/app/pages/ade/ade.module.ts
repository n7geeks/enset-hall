import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdeComponent } from "./ade.component";
import { NbCardModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { AdeToggleImageComponent } from './ade-toggle-image/ade-toggle-image.component';

@NgModule({
  declarations: [AdeComponent, AdeToggleImageComponent],
  imports: [CommonModule, NbCardModule, Ng2SmartTableModule],
})
export class AdeModule {}
