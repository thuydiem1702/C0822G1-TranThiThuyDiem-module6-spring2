import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OderCreateComponent } from './oder-create.component';

describe('OderCreateComponent', () => {
  let component: OderCreateComponent;
  let fixture: ComponentFixture<OderCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OderCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
