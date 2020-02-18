import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeinfoComponent } from './attributeinfo.component';

describe('AttributeinfoComponent', () => {
  let component: AttributeinfoComponent;
  let fixture: ComponentFixture<AttributeinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
