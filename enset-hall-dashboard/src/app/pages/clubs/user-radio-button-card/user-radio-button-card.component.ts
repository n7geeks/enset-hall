import { Component, Input } from "@angular/core";
import { User } from "../../../models/users.model";

@Component({
  selector: "ngx-user-radio-button-card",
  templateUrl: "./user-radio-button-card.component.html",
})
export class UserRadioButtonCardComponent {
  @Input() user: User;
  @Input() active: boolean = false;
}
