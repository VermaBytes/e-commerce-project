import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutersComponent } from './routers-component';

describe('RoutersComponent', () => {
  let component: RoutersComponent;
  let fixture: ComponentFixture<RoutersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
