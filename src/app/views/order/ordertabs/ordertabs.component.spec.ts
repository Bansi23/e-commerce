import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdertabsComponent } from './ordertabs.component';

describe('OrdertabsComponent', () => {
  let component: OrdertabsComponent;
  let fixture: ComponentFixture<OrdertabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdertabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdertabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
