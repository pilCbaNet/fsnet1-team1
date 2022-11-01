import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  AbstractControlOptions,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from './../../services/toast.service';
import { AuthService } from './../../services/auth.service';
import { EventTypes } from 'src/app/models/event-types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  @ViewChild('form')
  formHTML!: HTMLFormElement;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      phone:['', [Validators.pattern("\\d{8,10}")]],
      password: ['', Validators.required],
    });
  }

  //muestra estilos de validacion de bootstrap
  validate() {
    this.formHTML['nativeElement'].classList.add('was-validated');
  }
  removeValidate() {
    this.formHTML['nativeElement'].classList.remove('was-validated');
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.toastService.showToast(
            ':D',
            `Usuario ${res.username} creado con exito`,
            EventTypes.Success
          );
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          this.toastService.showToast(':(', err.error.message, EventTypes.Error);
          this.registerForm.reset();
        },
      });
    } else {
      this.validate();
    }
  }
}
