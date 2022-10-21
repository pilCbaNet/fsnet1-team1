import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleMovimientoComponent } from './detalle-movimiento.component';



@NgModule({
  declarations: [DetalleMovimientoComponent],
  imports: [
    CommonModule,
    DetalleMovimientoComponent
  ],
  exports:[
    DetalleMovimientoComponent
  ]
})
export class DetalleMovimientoModule { }
