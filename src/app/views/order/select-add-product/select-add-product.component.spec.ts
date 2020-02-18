import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAddProductComponent } from './select-add-product.component';

describe('SelectAddProductComponent', () => {
  let component: SelectAddProductComponent;
  let fixture: ComponentFixture<SelectAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
