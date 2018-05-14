import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesUsComponent } from './policies-us.component';

describe('PoliciesUsComponent', () => {
  let component: PoliciesUsComponent;
  let fixture: ComponentFixture<PoliciesUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliciesUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
