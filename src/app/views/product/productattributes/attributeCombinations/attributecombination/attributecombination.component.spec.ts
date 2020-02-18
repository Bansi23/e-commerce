import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributecombinationComponent } from './attributecombination.component';

describe('AttributecombinationComponent', () => {
  let component: AttributecombinationComponent;
  let fixture: ComponentFixture<AttributecombinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributecombinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributecombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
