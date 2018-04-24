import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNativeSdkComponent } from './start-native-sdk.component';

describe('StartNativeSdkComponent', () => {
  let component: StartNativeSdkComponent;
  let fixture: ComponentFixture<StartNativeSdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartNativeSdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNativeSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
