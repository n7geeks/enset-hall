import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TranslateModule} from "@ngx-translate/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";

@Component({
	selector: 'n7h-not-enset-student-dialog',
	standalone: true,
	imports: [CommonModule, MatCardModule, MatCheckboxModule, TranslateModule, MatExpansionModule, MatListModule, MatBottomSheetModule, NgOptimizedImage, MatIconModule, MatDialogModule],
	template: `
		<mat-card>
			<button mat-icon-button  class="close" mat-dialog-close>
				<mat-icon>close</mat-icon>
			</button>
			<section>
				<div>
					<mat-card-header>{{'DIALOG.NOT_STUDENT_ENSET_TITLE'|translate}}</mat-card-header>
					<mat-card-content>
							<mat-action-list>{{'DIALOG.NOT_STUDENT_ENSET_PAR1'|translate}}</mat-action-list>
							<mat-action-list>{{'DIALOG.NOT_STUDENT_ENSET_PAR2'|translate}}</mat-action-list>
							<mat-action-list>{{'DIALOG.NOT_STUDENT_ENSET_PAR3'|translate}} <a
								href="/contact">{{'DIALOG.NOT_STUDENT_ENSET_LINK'|translate}}</a></mat-action-list>
					</mat-card-content>
				</div>
				<div class="image">
					<img mat-card-lg-image ngSrc="../../../../assets/vectors/dialog-enset-notStudent.svg" height="297" width="297">
				</div>
			</section>
			<mat-card-footer>
				<section class="example-section">
					<mat-checkbox
						class="example-margin">{{'DIALOG.NOT_STUDENT_ENSET_CHECKBOX'|translate}}</mat-checkbox>
					<button (click)="$event"
							class="section-button">{{'DIALOG.NOT_STUDENT_ENSET_BUTTON'|translate}}</button>

				</section>
			</mat-card-footer>
		</mat-card>
	`,
	styles: [`
	 mat-card
	  {
		  background-color: #201F1E;
		  height: 350px;
		  width: 1000px;
		  box-shadow: none;
	 }
	 mat-card-header{
		 font-family: Poppins ;
		 color:#FFFFFF;
		 font-size: 30px;
		 font-weight: bold;
	 }
	  mat-action-list {
		  margin-top:5px;
		  font-size: 20px;
		  color: #FFFFFF;
      }
	  a:link,a:active,a:visited{
		  outline-offset: 0px;
		  text-align: center;
		  text-decoration: underline;
	      color:#FFFFFF;
	  }
	  section{
		  justify-content: space-between;
		  display: flex;
		  margin-right: 10px;
	  }
	  section .image{
		  position: relative;
		  margin-top: 60px;
		  top: 50%;
		  left:6%;
		  transform: translate(-50%, -50%);
	  }
	 section .section-button{
		  background-color: #0C8CE9;
		  border-radius: 15px;
		  color: #FFFFFF;
		  width: 5rem;
		  height: 2rem;
		  margin-right: 1rem;
		  border:none;
		  text-align: center;
	  }
	  .close{
		  position: absolute;
		  top: 0;
		  right: 0;
		  background: transparent;
		  outline: none;
		  border: 0px;
		  color: #FFFFFF;
		  margin: 2px;
	  }
	`],
})
export class NotEnsetStudentDialog {

}
