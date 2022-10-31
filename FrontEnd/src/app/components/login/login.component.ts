import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventTypes } from 'src/app/models/event-types';
import { AuthService } from './../../services/auth.service';
import { ToastService } from './../../services/toast.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (resp) => {
          this.toastService.showToast(
            'Bienvenido',
            'Usuario correcto',
            EventTypes.Success
          );
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.toastService.showToast(':(', err.error.message, EventTypes.Error);
          this.loginForm.reset();
          this.removeValidate();
        },
      });
    } else {
      this.validate();
    }
  }

  //muestra estilos de validacion de bootstrap
  validate() {
    this.formHTML['nativeElement'].classList.add('was-validated');
  }
  removeValidate() {
    this.formHTML['nativeElement'].classList.remove('was-validated');
  }

  ngOnInit(): void {}
}
