import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermUsComponent } from './term-us.component';

describe('TermUsComponent', () => {
  let component: TermUsComponent;
  let fixture: ComponentFixture<TermUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
