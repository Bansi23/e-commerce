import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingShippingComponent } from './billing-shipping.component';

describe('BillingShippingComponent', () => {
  let component: BillingShippingComponent;
  let fixture: ComponentFixture<BillingShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
