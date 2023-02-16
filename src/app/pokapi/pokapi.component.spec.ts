import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokapiComponent } from './pokapi.component';

describe('PokapiComponent', () => {
  let component: PokapiComponent;
  let fixture: ComponentFixture<PokapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokapiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
