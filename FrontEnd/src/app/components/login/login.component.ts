import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  login(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      console.log("mi formulario es valido");
    }else{
      console.log("mi formulario no es valido");
    }
  }

  validate($event:Event){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      $event.preventDefault();
      $event.stopPropagation();
    }else{
      console.log("es valid");
    }
    form.classList.add('was-validated');
  }

  ngOnInit(): void {}
}
