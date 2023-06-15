import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ClubsComponent } from "./clubs/clubs.component";
import { AdeComponent } from "./ade/ade.component";
import { UsersComponent } from "./users/users.component";
import { ScopesComponent } from "./scopes/scopes.component";
import { CreateClubFormComponent } from "./clubs/create-club-form/create-club-form.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        redirectTo: "clubs",
        pathMatch: "full",
      },
      {
        path: "clubs",
        component: ClubsComponent,
      },
      {
        path: "clubs/create",
        component: CreateClubFormComponent,
      },
      {
        path: "ade",
        component: AdeComponent,
      },
      {
        path: "users",
        component: UsersComponent,
      },
      {
        path: "scopes",
        component: ScopesComponent,
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
