import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { NotFoundModule } from "./not-found/not-found.module";
import { ClubsModule } from "./clubs/clubs.module";
import { AdeModule } from "./ade/ade.module";
import { UsersModule } from "./users/users.module";
import { ScopesModule } from "./scopes/scopes.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ClubsModule,
    AdeModule,
    UsersModule,
    ScopesModule,
    NotFoundModule,
  ],
  declarations: [PagesComponent],
})
export class PagesModule {}
