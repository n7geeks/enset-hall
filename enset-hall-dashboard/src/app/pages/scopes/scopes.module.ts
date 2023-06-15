import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScopesComponent } from "./scopes.component";
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ScopesFormModalComponent } from "./scopes-form-modal/scopes-form-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ScopesComponent, ScopesFormModalComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule,
  ],
})
export class ScopesModule {}
