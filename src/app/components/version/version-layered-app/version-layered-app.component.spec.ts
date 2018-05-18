import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionLayeredAppComponent } from './version-layered-app.component';

describe('VersionLayeredAppComponent', () => {
  let component: VersionLayeredAppComponent;
  let fixture: ComponentFixture<VersionLayeredAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionLayeredAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionLayeredAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
