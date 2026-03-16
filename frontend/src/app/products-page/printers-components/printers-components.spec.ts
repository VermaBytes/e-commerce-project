import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintersComponents } from './printers-components';

describe('PrintersComponents', () => {
  let component: PrintersComponents;
  let fixture: ComponentFixture<PrintersComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintersComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintersComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
