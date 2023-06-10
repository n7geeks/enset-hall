import {Component, Inject, Injectable} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";


@Injectable({providedIn: "root"})
export class ImageViewerService {
	constructor(private dialog: MatDialog) {}
	view(imageUrl: string) {
		if (imageUrl.startsWith("https://lh3.googleusercontent.com/")) {
			imageUrl = imageUrl.replace("=s96", "=s0");
		}
		this.dialog.open(ImageViewComponent, {
			data: imageUrl,
			width: "90%",
			height: "90%"
		});
	}
}

@Component({
	selector: "n7h-image-view",
	standalone: true,
	imports: [CommonModule, TranslateModule, MatButtonModule, MatIconModule, NgOptimizedImage],
	template: `
		<button mat-icon-button class="close" color="warn" (click)="close()">
			<mat-icon>close</mat-icon>
		</button>
		<div
			class="view"
		>
			<img
				[ngSrc]="data"
				alt=""
				fill="fill" />
		</div>
	`,
	styles: [`
		:host {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;

			.close {
				position: absolute;
				top: .5rem;
				right: .5rem;
				z-index: 1;
			}

			.view {
				position: relative;
				height: 90%;
				width: 90%;
				aspect-ratio: 1 / 1;
				border-radius: 1rem;
				overflow: hidden;
				img {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}
		}
	`]
})
export class ImageViewComponent {
	constructor(
		public dialogRef: MatDialogRef<ImageViewerService>,
		@Inject(MAT_DIALOG_DATA) public data: string) {}

	close() {
		this.dialogRef.close();
	}

}
