import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsNoApiDemoComponent } from './ngxs-no-api-demo.component';

describe('NgxsNoApiDemoComponent', () => {
  let component: NgxsNoApiDemoComponent;
  let fixture: ComponentFixture<NgxsNoApiDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxsNoApiDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxsNoApiDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
