import { Component } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { ScopesService } from "../../services/scopes.service";

@Component({
  selector: "ngx-users",
  templateUrl: "./users.component.html",
})
export class UsersComponent {
  settings = {
    columns: {
      photoUrl: {
        title: "Photo",
        editable: false,
        sort: false,
        type: "html",
        valuePrepareFunction: (photoUrl: string) => {
          return `<img src="${photoUrl}" width="50" height="50" />`;
        },
      },
      displayName: {
        title: "Name",
        type: "string",
        editable: false,
        sort: false,
      },
      email: {
        title: "Email",
        type: "string",
        editable: false,
        sort: false,
      },
      scope_id: {
        title: "Scope",
        type: "string",
        editable: true,
        sort: false,
        editor: {
          type: "list",
          config: {},
        },
      },
    },
    actions: {
      add: false,
      edit: true,
      delete: false,
      position: "right",
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    hideSubHeader: true,
  };

  users$ = this.usersService.getAll();

  constructor(
    private usersService: UsersService,
    private scopeService: ScopesService
  ) {
    this.scopeService.getAll().subscribe((scopes) => {
      this.settings.columns.scope_id.editor.config = {
        list: scopes.map((scope) => ({ title: scope.id, value: scope.id })),
      };
    });
  }

  changeScope(event: any) {
    const { newData, data } = event;
    this.usersService.update(data.id, { scope_id: newData.scope_id });
  }
}
