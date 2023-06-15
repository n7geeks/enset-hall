import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {Store} from "@ngxs/store";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Club} from "../../club.models";
import {map} from "rxjs";

@Component({
	selector: "n7h-clubs-selector",
	standalone: true,
	imports: [CommonModule, MatIconModule, MatListModule, NgOptimizedImage],
	template: `
        <ul>
            <li *ngFor="let club of clubs$ | async" (click)="select(club)">
                <img
                        [ngSrc]="club.logo"
                        [alt]="club.name"
                        width="50"
                        height="50"
                >
                <span>{{club.name}}</span>
            </li>
        </ul>
	`,
	styles: [`
	  :host {
	    padding: 0;
      }
	  ul {
        display: flex;
	    flex-direction: column;
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
	    gap: 1rem;
      }
      li {
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 1rem;
		&:hover {
	        filter: brightness(1.1);
        }
        img {
          margin-right: 10px;
          border-radius: 50%;
        }
      }
	`]
})
export class ClubsSelectorBottomSheet {
	constructor(
		private store: Store,
		public ref: MatBottomSheet
	) {
	}

	clubs$ = this.store
		.select<Club[]>(state => state.clubs)
		.pipe(map(clubs => clubs
			.filter(club => club.isOfficeMember || club.isGodfather)));

	select(club: Club) {
		this.ref.dismiss(club);
	}
}