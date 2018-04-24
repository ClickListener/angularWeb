import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLayeredAppComponent } from './start-layered-app.component';

describe('StartLayeredAppComponent', () => {
  let component: StartLayeredAppComponent;
  let fixture: ComponentFixture<StartLayeredAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartLayeredAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLayeredAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
