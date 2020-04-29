import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsApiDemoComponent } from './ngxs-api-demo.component';

describe('NgxsApiDemoComponent', () => {
  let component: NgxsApiDemoComponent;
  let fixture: ComponentFixture<NgxsApiDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxsApiDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxsApiDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
