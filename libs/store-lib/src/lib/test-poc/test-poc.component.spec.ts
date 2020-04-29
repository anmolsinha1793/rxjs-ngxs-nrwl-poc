import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPocComponent } from './test-poc.component';

describe('TestPocComponent', () => {
  let component: TestPocComponent;
  let fixture: ComponentFixture<TestPocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
