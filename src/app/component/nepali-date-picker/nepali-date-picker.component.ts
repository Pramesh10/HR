import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NepaliDatePicker } from '@anuz-pandey/nepali-date-picker';
declare var NepaliDatePicker: any;
@Component({
  selector: 'app-nepali-date-picker',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './nepali-date-picker.component.html',
  styleUrl: './nepali-date-picker.component.scss',
})
export class NepaliDatePickerComponent implements OnInit, AfterViewInit {
  @ViewChild('datePickerInput', { static: false }) datePickerInput!: ElementRef;
  ngAfterViewInit(): void {
    // Ensure datePickerInput is defined before using it
    const inputElement = document.getElementById('date-picker-input');
    if (inputElement) {
      new NepaliDatePicker('#date-picker-input', this.config);
    }
  }

  config = {
    format: 'YYYY-MM-DD', // 'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD', 'DD-MM-YYYY', 'DD/MM/YYYY', 'DD.MM.YYYY'
    disableAfterToday: false, // boolean: true | false
    disableBeforeToday: false, // boolean: true | false
    disableToday: false, // boolean: true | false
    closeOnDateSelect: true, // boolean: true | false
    markHolidays: true, // boolean: true | false
    holidays: ['Saturday'], // ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    indicateCurrentDate: true, // boolean: true | false
    setCurrentDate: false, // boolean: true | false
    position: 'left', // 'left', 'right' or 'center'
    daysFormat: 'dd', // 'ddd' for full day name, 'dd' for short day name, 'd' for 1 letter day name
    locale: 'np', // 'np' for nepali, 'en' for english
    theme: 'flat', // bordered | soft | flat
    darkMode: false, // boolean: true | false
    inline: false, // boolean: true | false
  };
  datePickerInstance: any;

  ngOnInit(): void {}
}
