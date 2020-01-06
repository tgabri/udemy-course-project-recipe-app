import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const { email, password } = authForm.value;

    this.isLoading = true;
    if (this.isLoginMode) {
    } else {
      this.authService.signup(email, password).subscribe(
        responseData => {
          console.log(responseData);
          this.isLoading = false;
        },
        error => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }

    authForm.reset();
  }
}
