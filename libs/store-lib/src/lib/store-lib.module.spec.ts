import { async, TestBed } from '@angular/core/testing';
import { StoreLibModule } from './store-lib.module';

describe('StoreLibModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreLibModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreLibModule).toBeDefined();
  });
});
