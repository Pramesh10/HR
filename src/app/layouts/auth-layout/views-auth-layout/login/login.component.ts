import { Component, inject } from '@angular/core';

import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../services/auth-services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //inject the services
  //inject the services
  router = inject(Router);

  userLoginServices = inject(AuthenticationService);
  //login model for login services
  loginModel: any = {};

  submitted: Boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log('Oninit enter');
  }

  //SUBMIT THE LOGIN FORM
  //SUBMIT THE LOGIN FORM
  userRole: string = 'admin';

  onSubmit(signInForm: NgForm) {
    this.submitted = true;

    // if (signInForm.valid) {
    //   console.log('Form submitted!', this.loginModel);
    //   this.userLoginServices
    //     .login(this.loginModel.username, this.loginModel.password)
    //     .subscribe((success) => {
    //       if (success) {
    //         console.log('Login successful');
    //       } else {
    //         console.log('error message');
    //       }
    //     });
    // } else {
    //   console.error('Not valid');
    // }

    if (this.userRole == 'admin') {
      this.router.navigateByUrl('/companyName');
    } else {
      this.router.navigateByUrl('/companyName');
    }
  }
}
