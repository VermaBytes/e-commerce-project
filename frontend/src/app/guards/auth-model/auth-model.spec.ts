import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModel } from './auth-model';

describe('AuthModel', () => {
  let component: AuthModel;
  let fixture: ComponentFixture<AuthModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
