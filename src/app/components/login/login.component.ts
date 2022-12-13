import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor
    (
      private authenticationService: AuthenticationService,
      private router: Router,
      private toastService: HotToastService
    ) { }


  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  });
  ngOnInit() {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    // this.authenticationService.login(email, password).subscribe(() => {
    //   this.router.navigate(['/home']);
    // });

    this.authenticationService.login(email, password).pipe(
      this.toastService.observe({
        success: 'Logged in succesfully',
        error: 'Error Occured',
        loading: 'Loading...'
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
