import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductattributesComponent } from './productattributes.component';

describe('ProductattributesComponent', () => {
  let component: ProductattributesComponent;
  let fixture: ComponentFixture<ProductattributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductattributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductattributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
