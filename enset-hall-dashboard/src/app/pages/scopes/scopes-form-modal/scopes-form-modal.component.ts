import { Component, Input, OnInit } from "@angular/core";
import { Scope } from "../../../models/scopes.model";
import { NbDialogRef, NbToastrService } from "@nebular/theme";
import { ScopesService } from "../../../services/scopes.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { majors } from "../../../../assets/data/majors";
import { departments } from "../../../../assets/data/departments";
import { roles } from "../../../../assets/data/roles";

@Component({
  selector: "ngx-scopes-form-modal",
  templateUrl: "./scopes-form-modal.component.html",
})
export class ScopesFormModalComponent implements OnInit {
  @Input() scope: Scope = null;
  isEdit: boolean = false;

  form: FormGroup;
  majors = majors;
  departments = departments;
  roles = roles;

  constructor(
    protected ref: NbDialogRef<ScopesFormModalComponent>,
    private scopesService: ScopesService,
    private toastr: NbToastrService
  ) {
    this.form = new FormGroup(
      {
        id: new FormControl("", Validators.required),
        school: new FormControl("", Validators.required),
        major: new FormControl(majors[0].name),
        department: new FormControl(departments[0].name, Validators.required),
        promo: new FormControl(""),
        role: new FormControl(roles[0].name, Validators.required),
        diploma: new FormControl(""),
        formation: new FormControl(""),
        laboratory: new FormControl(""),
      },
      { updateOn: "submit" }
    );
  }

  ngOnInit(): void {
    this.isEdit = this.scope != null;
    if (this.isEdit) {
      console.log(this.scope);
      this.form.patchValue(this.scope);
    }
  }

  // Getters
  get id() {
    return this.form.get("id");
  }
  get school() {
    return this.form.get("school");
  }
  get major() {
    return this.form.get("major");
  }
  get department() {
    return this.form.get("department");
  }
  get promo() {
    return this.form.get("promo");
  }
  get role() {
    return this.form.get("role");
  }
  get diploma() {
    return this.form.get("diploma");
  }
  get formation() {
    return this.form.get("formation");
  }
  get laboratory() {
    return this.form.get("laboratory");
  }

  submit() {
    if (this.form.valid) {
      if (this.isEdit) {
        this.scopesService.update(this.scope.id, this.form.value);
      } else {
        this.scopesService.create(this.form.value);
      }

      this.toastr.success("Opération effectuée avec succès", "Succès");
      this.ref.close();
    } else {
      this.toastr.danger("Veuillez vérifier vos informations", "Erreur");
    }
  }

  cancel() {
    this.ref.close();
  }
}
