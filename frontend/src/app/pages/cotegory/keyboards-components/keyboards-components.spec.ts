import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardsComponents } from './keyboards-components';

describe('KeyboardsComponents', () => {
  let component: KeyboardsComponents;
  let fixture: ComponentFixture<KeyboardsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardsComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyboardsComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
