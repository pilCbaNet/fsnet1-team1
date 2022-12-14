import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
import { EncrDecrService } from 'src/app/helpers/encr-decr-service.service';

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
    private authService: AuthService,
    private EncrDecr: EncrDecrService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        Usuario1: ['', [Validators.required, Validators.minLength(3)]],
        Dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        Nombre: ['', [Validators.required, Validators.minLength(3)]],
        Apellido: ['', [Validators.required, Validators.minLength(3)]],
        Email: ['', [Validators.required, Validators.email]],
        Telefono: ['', [Validators.pattern('\\d{10}')]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      } as AbstractControlOptions
    );

    console.log(this.registerForm.value);
  }

  register() {
    if (this.registerForm.valid) {
      this.registerForm.value.password = this.EncrDecr.set(
        this.registerForm.value.password
      );
      console.log(this.registerForm.value);
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
          this.toastService.showToast(
            ':(',
            `${err.error.message}`,
            EventTypes.Error
          );
          this.registerForm.reset();
        },
      });
    }
  }
}

export class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(control: AbstractControl) {
    const password = control.get('password')!.value;

    const confirmPassword = control.get('confirmPassword')!.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')!.setErrors({ ConfirmPassword: true });
      return;
    } else {
      return null;
    }
  }
}
