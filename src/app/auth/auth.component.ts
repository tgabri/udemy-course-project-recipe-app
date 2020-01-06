import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { AuthService, AuthResponseData } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const { email, password } = authForm.value;
    let authObserv: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObserv = this.authService.login(email, password);
    } else {
      authObserv = this.authService.signup(email, password);
    }

    authObserv.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      error => {
        this.error = error;
        this.isLoading = false;
      }
    );
    authForm.reset();
  }
}
