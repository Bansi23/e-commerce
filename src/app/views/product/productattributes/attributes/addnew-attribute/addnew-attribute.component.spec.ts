import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewAttributeComponent } from './addnew-attribute.component';

describe('AddnewAttributeComponent', () => {
  let component: AddnewAttributeComponent;
  let fixture: ComponentFixture<AddnewAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
