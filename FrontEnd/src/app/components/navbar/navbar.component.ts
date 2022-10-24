import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  clientName: string = '';

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.clientName = this.tokenService.getName();
  }

  logout() {
    this.tokenService.logout();
  }

  closeNav() {
    let navBar: HTMLElement = document.querySelector('.navbar-collapse')!;

    if (navBar.classList.contains('show')) {
      navBar.classList.remove('show');
    } else {
      navBar.classList.add('show');
    }
  }
}
