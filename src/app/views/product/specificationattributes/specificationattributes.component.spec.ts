import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationattributesComponent } from './specificationattributes.component';

describe('SpecificationattributesComponent', () => {
  let component: SpecificationattributesComponent;
  let fixture: ComponentFixture<SpecificationattributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationattributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationattributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
