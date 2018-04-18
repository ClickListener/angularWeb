import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesEuComponent } from './policies-eu.component';

describe('PoliciesEuComponent', () => {
  let component: PoliciesEuComponent;
  let fixture: ComponentFixture<PoliciesEuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliciesEuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesEuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
