import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NepaliDatePickerComponent } from './nepali-date-picker.component';

describe('NepaliDatePickerComponent', () => {
  let component: NepaliDatePickerComponent;
  let fixture: ComponentFixture<NepaliDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NepaliDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NepaliDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
