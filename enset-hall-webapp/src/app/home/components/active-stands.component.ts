import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {Stand} from "../../stands/stand.model";
import {ActiveStandComponent} from "../../stands/active-stand.component";

@Component({
	selector: 'n7h-active-stands',
	standalone: true,
	imports: [CommonModule, TranslateModule, MatIconModule, ActiveStandComponent],
	template: `
		<h3>
			<mat-icon>
				<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M3 21l18 0"></path>
					<path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"></path>
					<path d="M5 21l0 -10.15"></path>
					<path d="M19 21l0 -10.15"></path>
					<path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"></path>
				</svg>
			</mat-icon>
			{{ 'ACTIVE_STANDS' | translate }}
		</h3>
		<div class="active-stands">
			<n7h-active-stand *ngFor="let stand of stands" [stand]="stand"></n7h-active-stand>
		</div>
	`,
	styles: [`
		h3 {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
		.active-stands {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			margin: 1rem 0;
			padding: 0 .5rem;
		}

	`]
})
export class ActiveStandsComponent {
	testStand: Stand = {
		id: '1',
		subject: 'Registration is open, join N7Geeks now!',
		club: {
			godfather: {
				id: '1',
				displayName: "Zineb EDDAMGHI",
				email: "z.eddamghi@etu.enset-media.ac.ma",
				is_allowed: true,
				photoUrl: "https://lh3.googleusercontent.com/a/AGNmyxaJyl7qRfyDcQz2fvT1qV1kfKWT6A_iaHcPNf6U=s96-c",
				scope_id: "iibdcc2021",
				deleted: false,
			},
			id: '1',
			about: '',
			name: 'N7Geeks',
			logo: 'https://files.bensadik.net/download/ejajZJWy.png',
			banner: '',
			isAdeClub: true,
			chapters: [],
			isOpen: true,
			handle: 'n7geeks',
			catchphrase: 'We are the N7Geeks, we are the best!',
		},
		organizers: [
			{
				id: '1',
				displayName: "Zineb EDDAMGHI",
				email: "z.eddamghi@etu.enset-media.ac.ma",
				is_allowed: true,
				photoUrl: "https://lh3.googleusercontent.com/a/AGNmyxaJyl7qRfyDcQz2fvT1qV1kfKWT6A_iaHcPNf6U=s96-c",
				scope_id: "iibdcc2021",
				deleted: false,
			},
			{
				id: '2',
				displayName: "Zineb EDDAMGHI",
				email: "z.eddamghi@etu.enset-media.ac.ma",
				is_allowed: true,
				photoUrl: "https://lh3.googleusercontent.com/a/AGNmyxak62QoGu2GIuC8PPiyUfA7jp1hxcFMmHebeUBP=s96-c",
				scope_id: "iibdcc2021",
				deleted: false,
			},
			{
				id: '3',
				displayName: "Zineb EDDAMGHI",
				email: "z.eddamghi@etu.enset-media.ac.ma",
				is_allowed: true,
				photoUrl: "https://lh3.googleusercontent.com/a/AGNmyxZhVo0dAELdOGGLmu9g4EWr6RX9ME5Hzth8gJSU=s96-c",
				scope_id: "iibdcc2021",
				deleted: false,
			},
			{
				id: '4',
				displayName: "Zineb EDDAMGHI",
				email: "z.eddamghi@etu.enset-media.ac.ma",
				is_allowed: true,
				photoUrl: "https://lh3.googleusercontent.com/a/AAcHTtffJ8N9jgzCF9V5VH38H8GDvJrg1VQ8xWhRO3_T=s96-c",
				scope_id: "iibdcc2021",
				deleted: false,
			},
			{
				id: '5',
				displayName: "Zineb EDDAMGHI",
				email: "z.eddamghi@etu.enset-media.ac.ma",
				is_allowed: true,
				photoUrl: "https://lh3.googleusercontent.com/a/AGNmyxaJyl7qRfyDcQz2fvT1qV1kfKWT6A_iaHcPNf6U=s96-c",
				scope_id: "iibdcc2021",
				deleted: false,
			},
			{
				id: '6',
				displayName: "Zineb EDDAMGHI",
				email: "z.eddamghi@etu.enset-media.ac.ma",
				is_allowed: true,
				photoUrl: "https://lh3.googleusercontent.com/a/AGNmyxaJyl7qRfyDcQz2fvT1qV1kfKWT6A_iaHcPNf6U=s96-c",
				scope_id: "iibdcc2021",
				deleted: false,
			},
		],
		link: '/stands/2'
	};
	stands: Stand[] = [this.testStand, this.testStand];
}
