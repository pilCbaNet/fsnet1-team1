import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toast/toaster.component';
import { UltimosMovimientosComponent } from './pages/ultimos-movimientos/ultimos-movimientos.component';
import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages.component';
import { DetalleMovimientoComponent } from './pages/ultimos-movimientos/components/detalle-movimiento/detalle-movimiento.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingpageComponent,
    NavbarComponent,
    FooterComponent,
    ToastComponent,
    ToasterComponent,
    UltimosMovimientosComponent,
    DetalleMovimientoComponent,
    HomeComponent,
    PagesComponent
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
