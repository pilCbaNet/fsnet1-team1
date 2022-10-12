import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
<<<<<<< HEAD
import { FooterComponent } from './footer/footer.component';
=======
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toast/toaster.component';
>>>>>>> 05d0ea6c17390c7798c80c93f26b9a42acbc33a0

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingpageComponent,
    NavbarComponent,
<<<<<<< HEAD
    FooterComponent
=======
    ToastComponent,
    ToasterComponent,
>>>>>>> 05d0ea6c17390c7798c80c93f26b9a42acbc33a0
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
