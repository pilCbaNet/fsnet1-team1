import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { UltimosMovimientosComponent } from './components/ultimos-movimientos/ultimos-movimientos.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: '', component: LandingpageComponent, canActivate: [NoAuthGuard] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TransactionsComponent },
      { path: 'ultimos-movimientos', component: UltimosMovimientosComponent },
      { path: '**', redirectTo: 'ultimos-movimientos' },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
