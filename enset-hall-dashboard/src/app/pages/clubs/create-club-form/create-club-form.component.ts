import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClubsService } from "../../../services/clubs.service";
import { NbToastrService } from "@nebular/theme";
import { Router } from "@angular/router";
import { User } from "../../../models/users.model";
import { UploadService } from "../../../services/upload.service";

@Component({
  selector: "ngx-create-club-form",
  templateUrl: "./create-club-form.component.html",
})
export class CreateClubFormComponent {
  form: FormGroup;
  godfather: User = null;
  isLoading: boolean = false;

  logoUrl: string = "assets/images/club-logo-placeholder.png";
  bannerUrl: string = "assets/images/club-banner-placeholder.png";

  constructor(
    private clubsService: ClubsService,
    private toastr: NbToastrService,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.form = new FormGroup(
      {
        logo: new FormControl(null),
        banner: new FormControl(null),
        name: new FormControl("", Validators.required),
        handle: new FormControl("", Validators.required),
        catchphrase: new FormControl(""),
        about: new FormControl(""),
        isOpen: new FormControl(false),
      },
      { updateOn: "submit" }
    );
  }

  // Getters
  get logo() {
    return this.form.get("logo");
  }
  get banner() {
    return this.form.get("banner");
  }
  get name() {
    return this.form.get("name");
  }
  get handle() {
    return this.form.get("handle");
  }
  get catchphrase() {
    return this.form.get("catchphrase");
  }
  get about() {
    return this.form.get("about");
  }
  get isOpen() {
    return this.form.get("isOpen");
  }

  selectGodfather(user: User) {
    this.godfather = user;
  }

  async createClub() {
    // Check if a godfather is selected
    if (this.godfather === null) {
      this.toastr.danger("Veuillez choisir un parrain", "Erreur");
      return;
    }

    if (this.form.valid) {
      this.isLoading = true;

      // Upload logo & banner
      const logoPromise = this.uploadLogo();
      const bannerPromise = this.uploadBanner();

      Promise.all([logoPromise, bannerPromise])
        .then((values) => {
          this.form.patchValue({
            logo: values[0],
            banner: values[1],
          });

          const club = {
            ...this.form.value,
            isAdeClub: false,
            godfather: this.godfather,
            chapters: [
              {
                activities: [],
                officeMembers: [],
                members: [],
                year: new Date().getFullYear(),
              },
            ],
          };

          this.clubsService.create(club);
          this.toastr.success("Le club a été créé avec succès", "Succès");
          this.router.navigate(["/clubs"]);
        })
        .catch((error) => {
          this.isLoading = false;
          this.toastr.danger(
            "Une erreur s'est produite lors du téléchargement de l'image",
            "Erreur"
          );
        });
    } else {
      this.isLoading = false;
      this.toastr.danger("Veuillez remplir tous les champs", "Erreur");
    }
  }

  async uploadLogo() {
    return await this.uploadService.uploadFile(this.logo.value);
  }

  async uploadBanner() {
    return await this.uploadService.uploadFile(this.banner.value);
  }

  previewLogo(event) {
    const file = event.target.files[0];
    this.form.patchValue({ logo: file });

    const reader = new FileReader();
    reader.onload = (e) => {
      this.logoUrl = e.target.result.toString();
    };
    reader.readAsDataURL(file);
  }

  previewBanner(event) {
    const file = event.target.files[0];
    this.form.patchValue({ banner: file });

    const reader = new FileReader();
    reader.onload = (e) => {
      this.bannerUrl = e.target.result.toString();
    };
    reader.readAsDataURL(file);
  }
}
