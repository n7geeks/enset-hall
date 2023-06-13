import {AfterViewInit, Component, OnInit} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngxs/store";
import { AuthUser } from "../authentication/models/AuthUser";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "../home/home.component";
import { HeaderComponent } from "../header/header.component";
import {Router, RouterModule} from "@angular/router";
import {PostsActions} from "../posts/posts.actions";
import {StandsActions} from "../stands/stands.actions";

@Component({
	selector: 'n7h-main',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		HeaderComponent,
		HomeComponent,
		FormsModule
	],
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
	constructor(private store: Store, private router: Router) {}
	protected user$ = this.store.select<AuthUser>(state => state.authentication.user);
	async ngOnInit() {
		if (window.location.pathname === '/') {
			await this.router.navigate(['home']);
		}
	}

	ngAfterViewInit(): void {
		this.store.dispatch(new PostsActions.FetchPosts());
		this.store.dispatch(new StandsActions.FetchStands());
	}
}
