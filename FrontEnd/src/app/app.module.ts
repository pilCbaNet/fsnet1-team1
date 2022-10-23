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
import { UltimosMovimientosComponent } from './components/ultimos-movimientos/ultimos-movimientos.component';
import { HomeComponent } from './components/home/home.component';
import { DetalleMovimientoComponent } from './components/detalle-movimiento/detalle-movimiento.component';

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
