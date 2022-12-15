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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toast/toaster.component';
import { UltimosMovimientosComponent } from './components/ultimos-movimientos/ultimos-movimientos.component';
import { HomeComponent } from './components/home/home.component';
import { DetalleMovimientoComponent } from './components/ultimos-movimientos/detalle-movimiento/detalle-movimiento.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TransactionListComponent } from './components/transactions/transaction-list/transaction-list.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { AddBalanceModalComponent } from './components/add-balance-modal/add-balance-modal.component';
import { TransferBalanceModalComponent } from './components/transfer-balance-modal/transfer-balance-modal.component';
import { DepositsComponent } from './components/transactions/deposits/deposits.component';
import { EncrDecrService } from './helpers/encr-decr-service.service';

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
    TransactionListComponent,
    TransactionsComponent,
    QuienesSomosComponent,
    AddBalanceModalComponent,
    TransferBalanceModalComponent,
    DepositsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    [EncrDecrService],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
