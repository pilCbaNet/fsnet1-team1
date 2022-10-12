import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
<<<<<<< HEAD
import { FooterComponent } from './components/footer/footer.component';
=======
import { AuthGuard } from './guards/auth.guard';
>>>>>>> 05d0ea6c17390c7798c80c93f26b9a42acbc33a0

const routes: Routes = [
  { path: '', component: LandingpageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
<<<<<<< HEAD
  { path: 'footer', component: FooterComponent },
  { path: '**', redirectTo:""},
=======
  { path: '**', redirectTo: '' },
>>>>>>> 05d0ea6c17390c7798c80c93f26b9a42acbc33a0
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
