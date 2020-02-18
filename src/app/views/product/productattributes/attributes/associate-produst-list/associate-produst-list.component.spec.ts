import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateProdustListComponent } from './associate-produst-list.component';

describe('AssociateProdustListComponent', () => {
  let component: AssociateProdustListComponent;
  let fixture: ComponentFixture<AssociateProdustListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateProdustListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateProdustListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
