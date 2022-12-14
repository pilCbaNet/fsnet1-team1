import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventTypes } from 'src/app/models/event-types';
import { AuthService } from './../../services/auth.service';
import { ToastService } from './../../services/toast.service';
import { Router } from '@angular/router';
import { EncrDecrService } from 'src/app/helpers/encr-decr-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  @ViewChild('form')
  formHTML!: HTMLFormElement;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private EncrDcr: EncrDecrService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginForm.value.password = this.EncrDcr.set(
        this.loginForm.value.password
      );
      console.log(this.loginForm.value.password);
      this.authService.login(this.loginForm.value).subscribe({
        next: (resp) => {
          if (resp.message == 'No Username') {
            this.toastService.showToast(
              ':(',
              "Username doesn't exist",
              EventTypes.Error
            );
            this.loginForm.reset();
          } else if (resp.message == 'Incorrect Password') {
            this.toastService.showToast(
              ':(',
              'Password was incorrect',
              EventTypes.Error
            );
            this.loginForm.reset();
          } else {
            this.toastService.showToast(
              'Bienvenido',
              'Usuario correcto',
              EventTypes.Success
            );
            this.router.navigateByUrl('/home');
          }
        },
        error: (err) => {
          this.toastService.showToast(
            ':(',
            err.error.message,
            EventTypes.Error
          );
          this.loginForm.reset();
        },
      });
    }
  }

  ngOnInit(): void {}
}
