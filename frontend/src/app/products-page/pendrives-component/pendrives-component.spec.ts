import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendrivesComponent } from './pendrives-component';

describe('PendrivesComponent', () => {
  let component: PendrivesComponent;
  let fixture: ComponentFixture<PendrivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendrivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendrivesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
