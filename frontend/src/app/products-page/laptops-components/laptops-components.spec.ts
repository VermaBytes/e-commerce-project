import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopsComponents } from './laptops-components';

describe('LaptopsComponents', () => {
  let component: LaptopsComponents;
  let fixture: ComponentFixture<LaptopsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaptopsComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaptopsComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
