import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseComponents } from './mouse-components';

describe('MouseComponents', () => {
  let component: MouseComponents;
  let fixture: ComponentFixture<MouseComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouseComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MouseComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
