import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
@Component({
	selector: 'enset-hall-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	imports: [
		CommonModule,
		RouterModule
	]
})
export class AppComponent {
	title = 'enset-hall';
	constructor() {}
}
