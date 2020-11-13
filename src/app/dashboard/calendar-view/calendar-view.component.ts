import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';
import { DateInMonth } from 'src/app/DateInMonth';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  @Input() monthIndex;
  @Input() year;
  @Input() city;

  // assign user selected date to selectedDate
  selectedDate: any;

  // use dateObj to store DateInMonth objects
  dateObj: Array<Array<DateInMonth>> = Array();

  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  responseDateObjs: Map<any, any> = new Map();

  constructor(private holidayServiceObj: HolidayService) {

  }

  /**
   * Generate month when year or monthIndex or city changes
   */

  ngOnChanges(changes: SimpleChanges): void {

  }


  ngOnInit() {
  }

  /**
   *  Generate the data for the 42 cells in the table
   *  Property "enabled" to be true for the current month
   *  After generating fetch holiday list.
   */
  monthGenerator() {

  }


  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  holidayInitializer() {
 
  }
}
