import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionRnsdkComponent } from './version-rnsdk.component';

describe('VersionRnsdkComponent', () => {
  let component: VersionRnsdkComponent;
  let fixture: ComponentFixture<VersionRnsdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionRnsdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionRnsdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
