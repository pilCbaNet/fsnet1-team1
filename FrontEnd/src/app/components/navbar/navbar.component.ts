import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  constructor(private tokenService:TokenService, private router:Router) { }

  logout(){
    this.tokenService.logout()
    this.router.navigateByUrl("/login")
  }
}
