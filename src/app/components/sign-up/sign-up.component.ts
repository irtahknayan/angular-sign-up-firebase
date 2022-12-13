import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';


export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      //if both has a value and if they are not equal
      return { //returning key if not match
        passwordDontMatch: true
      }
    }
    return null; //null means no error
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required),
    confirmPassword: new UntypedFormControl('', Validators.required)
  }, passwordMatchValidator());  // cross field validation


  constructor(private authenticationService: AuthenticationService, private toastService: HotToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  submit() {
    if (!this.signupForm.valid) {
      return;
    }

    const { name, email, password } = this.signupForm.value;
    this.authenticationService.signUp(name, email, password).pipe(
      this.toastService.observe({
        success: "Registration successfull",
        loading: "Loading...",
        error: ({ message }) => `${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    }

    )
  }
}
