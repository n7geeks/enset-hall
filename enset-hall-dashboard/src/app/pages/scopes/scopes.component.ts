import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Scope } from "../../models/scopes.model";
import { ScopesService } from "../../services/scopes.service";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { ScopesFormModalComponent } from "./scopes-form-modal/scopes-form-modal.component";

@Component({
  selector: "ngx-scopes",
  templateUrl: "./scopes.component.html",
})
export class ScopesComponent {
  settings = {
    columns: {
      id: {
        title: "ID",
        type: "string",
        sort: false,
        editable: false,
      },
      school: {
        title: "Ecole",
        type: "string",
        sort: false,
        editable: false,
      },
      major: {
        title: "Filière",
        type: "string",
        sort: false,
        editable: false,
      },
      department: {
        title: "Département",
        type: "string",
        sort: false,
        editable: false,
      },
      promo: {
        title: "Promo",
        type: "number",
        sort: false,
        editable: false,
        width: "60px",
      },
      role: {
        title: "Rôle",
        type: "string",
        sort: false,
        editable: false,
      },
    },
    actions: {
      position: "right",
      add: false,
      edit: true,
      delete: true,
    },
    mode: "external",
    hideSubHeader: true,
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    rowClassFunction: (row) => {
      return row.data.id === "external" ? "d-none" : "";
    },
  };

  scopes$: Observable<Scope[]> = this.scopesService.getAll();

  constructor(
    private scopesService: ScopesService,
    private dialogService: NbDialogService,
    private toastr: NbToastrService
  ) {}

  openScopesFormModal(scope: Scope | null = null) {
    const options = scope ? { context: { scope } } : {};
    this.dialogService.open(ScopesFormModalComponent, options);
  }

  deleteScope(scope: Scope) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce scope ?")) {
      if (scope.id === "external") {
        this.toastr.warning(
          "Vous ne pouvez pas supprimer ce scope",
          "Opération interdite"
        );
        return;
      }

      this.scopesService.delete(scope.id);
      this.toastr.success("Scope supprimé avec succès", "Opération réussie");
    }
  }
}
