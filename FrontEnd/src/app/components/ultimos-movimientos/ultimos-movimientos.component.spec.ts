import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimosMovimientosComponent } from './ultimos-movimientos.component';

describe('UltimosMovimientosComponent', () => {
  let component: UltimosMovimientosComponent;
  let fixture: ComponentFixture<UltimosMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimosMovimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimosMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
