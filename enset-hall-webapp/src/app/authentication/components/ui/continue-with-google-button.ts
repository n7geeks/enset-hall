import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { Store } from "@ngxs/store";
import { AuthenticationActions } from "../../state/authentication.actions";
import { AuthenticationState } from "../../state/authentication.state";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
	selector: 'n7h-continue-with-google-button',
	template: `
		<button matRipple matRippleColor="#e1e1e1" type="button" (click)="signIn()" [disabled]="busy$ | async">
			<ng-container *ngIf="busy$ | async; else notBusy">
				<mat-spinner [diameter]="24" [strokeWidth]="3" color="primary"></mat-spinner>
			</ng-container>
			<ng-template #notBusy>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M23.04 12.2614C23.04 11.4459 22.9668 10.6618 22.8309 9.90909H12V14.3575H18.1891C17.9225 15.795 17.1123 17.013 15.8943 17.8284V20.7139H19.6109C21.7855 18.7118 23.04 15.7636 23.04 12.2614Z" fill="#4285F4"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 23.4998C15.1049 23.4998 17.7081 22.4701 19.6108 20.7137L15.8942 17.8282C14.8645 18.5182 13.5472 18.926 11.9999 18.926C9.00469 18.926 6.46946 16.903 5.56514 14.1848H1.7231V17.1644C3.61537 20.9228 7.50446 23.4998 11.9999 23.4998Z" fill="#34A853"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M5.56523 14.1851C5.33523 13.4951 5.20455 12.758 5.20455 12.0001C5.20455 11.2421 5.33523 10.5051 5.56523 9.81506V6.83552H1.72318C0.944318 8.38802 0.5 10.1444 0.5 12.0001C0.5 13.8557 0.944318 15.6121 1.72318 17.1646L5.56523 14.1851Z" fill="#FBBC05"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 5.07386C13.6883 5.07386 15.2042 5.65409 16.3961 6.79364L19.6945 3.49523C17.7029 1.63955 15.0997 0.5 11.9999 0.5C7.50446 0.5 3.61537 3.07705 1.7231 6.83545L5.56514 9.815C6.46946 7.09682 9.00469 5.07386 11.9999 5.07386Z" fill="#EA4335"/>
				</svg>
				<span>Continue with Google</span>
			</ng-template>
		</button>
	`,
	styles: [`
		button {
			background-color: white;
			font-family: 'Roboto', sans-serif;
			font-weight: 500;
			font-size: 1rem;
			color: #333;
			height: 3rem;
			width: 16rem;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			border-radius: .9rem;
			border: 0;
			cursor: pointer;
			transition: background-color .2s ease-in-out;
			box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
						0px 6px 10px 0px rgba(0, 0, 0, 0.14),
						0px 1px 18px 0px rgba(0, 0, 0, 0.12);
			&:hover {
				background-color: #f5f5f5;
			}
		}
		svg, span {
			display: inline-block;
			vertical-align: middle;
			z-index: 10;
		}
	`],
	standalone: true,
	imports: [
		CommonModule,
		TranslateModule,
		MatButtonModule,
		MatIconModule,
		MatRippleModule,
		MatProgressSpinnerModule
	]
})
export class ContinueWithGoogleButtonComponent {
	constructor(private store: Store) {}
	busy$ = this.store.select<boolean>(AuthenticationState.inProgress);
	protected signIn() {
		this.store.dispatch(new AuthenticationActions.GoogleSignIn());
	}
}
