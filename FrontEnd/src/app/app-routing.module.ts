import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages.component';
import { UltimosMovimientosComponent } from './pages/ultimos-movimientos/ultimos-movimientos.component';

const routes: Routes = [
  { path: '', component: PagesComponent, canActivate: [AuthGuard], children:[
    { path: '', component: HomeComponent },
    { path: 'ultimos-movimientos', component: UltimosMovimientosComponent },
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'footer', component: FooterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
