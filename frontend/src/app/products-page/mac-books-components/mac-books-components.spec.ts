import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacBooksComponents } from './mac-books-components';

describe('MacBooksComponents', () => {
  let component: MacBooksComponents;
  let fixture: ComponentFixture<MacBooksComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacBooksComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacBooksComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
