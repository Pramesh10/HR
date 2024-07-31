import { Component, inject } from '@angular/core';

import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../services/auth-services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage,
    CommonModule,
    ToastModule,
  ],
  providers: [MessageService],
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
  userIp: string;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    console.log('Oninit enter');
    this.getUserIp();
  }

  getUserIp() {
    this.userLoginServices.getIpAddress().subscribe(
      (data) => {
        this.userIp = data.ip;
        console.log(this.userIp);
        this.loginModel.ipAddress = this.userIp;
      },
      (error) => {
        console.error('Error fetching IP address', error);
      }
    );
  }

  //SUBMIT THE LOGIN FORM
  onSubmit(signInForm: NgForm) {
    this.submitted = true;

    if (signInForm.valid) {
      if (
        this.loginModel.ipAddress === null ||
        this.loginModel.ipAddress === undefined
      ) {
        this.loginModel.ipAddress = '000.000.00.00';
      }
      this.userLoginServices.login(this.loginModel).subscribe((success) => {
        console.log(success);
        if (success) {
          this.router.navigateByUrl('/companyName/admin');
          console.log('Login successful');
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Fail',
            detail: 'Incorrect UserName/Password',
            styleClass: 'custom-toast',
          });
        }
      });
    } else {
      console.error('Not valid');
    }
  }
}
