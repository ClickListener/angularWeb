import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermEuComponent } from './term-eu.component';

describe('TermEuComponent', () => {
  let component: TermEuComponent;
  let fixture: ComponentFixture<TermEuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermEuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermEuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
