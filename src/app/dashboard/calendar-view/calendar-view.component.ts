import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';
import { DateInMonth } from 'src/app/DateInMonth';
import { map } from 'rxjs/operators';

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

  weekObj = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

  currentMonth;
  lastMonthDays;

  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  responseDateObjs: Map<any, any> = new Map();

  constructor(private holidayServiceObj: HolidayService) {

  }

  /**
   * Generate month when year or monthIndex or city changes
   */

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {

    // tslint:disable-next-line: forin
    for (const propName in changes) {
      const change = changes[propName];

      // tslint:disable-next-line: triple-equals
      if (propName === 'city' && change.currentValue != change.previousValue) {
      this.city = change.currentValue;
      }

      // tslint:disable-next-line: triple-equals
      if (propName === 'year' && change.currentValue != change.previousValue ) {
      this.year = change.currentValue;
      }

      // tslint:disable-next-line: triple-equals
      if (propName === 'monthIndex' && change.currentValue != change.previousValue) {
      this.monthIndex = change.currentValue;
      }

      //console.log(this.city);
      //console.log(this.year);
      //console.log(this.monthIndex);
 }

    this.monthGenerator();


  }


  ngOnInit() {
      }

  /**
   *  Generate the data for the 42 cells in the table
   *  Property "enabled" to be true for the current month
   *  After generating fetch holiday list.
   */
  monthGenerator() {

    let row = 0;
    let cols = 0;



    const lastNumOfDays = new Date(this.year, this.monthIndex, 0).getDate();

    //console.log('lastNumOfDays=' + lastNumOfDays);
    //console.log(this.monthIndex);
    var firstDay = new Date(this.year, this.monthIndex, 1);

    this.currentMonth = firstDay.getMonth();

    //console.log('currentMonth=' + this.currentMonth);
    //console.log(firstDay);
    //console.log(firstDay.getDay());
    if (firstDay.getDay() === 0){
      this.lastMonthDays = 6;
    }
    else{
      this.lastMonthDays = firstDay.getDay() - 1;
    }

    //console.log('this.lastMonthDays'+ this.lastMonthDays );
    //this.weekObj = [];
    this.dateObj[row] = [];
    for (let i = lastNumOfDays -  this.lastMonthDays ; i <= lastNumOfDays; i++) {
      if (cols === 7) {
        row++;
        this.dateObj[row] = [];
        cols = 0;
      }

      const lastdateInMonth = new DateInMonth();
      const lastdateNew =  new Date(this.year, this.monthIndex - 1, i );
      lastdateInMonth.date = lastdateNew.toLocaleDateString('en-GB');
      lastdateInMonth.enabled = true;
      //console.log('lastdateInMonth.date' + lastdateInMonth.date);

      this.dateObj[row][cols] = lastdateInMonth;
      cols++;
     // this.weekObj.push(lastdateNew.toLocaleDateString('en-US', {weekday: 'long'}));
    }

    //console.log(this.weekObj);

    //console.log('this.monthIndex=' + this.monthIndex);
    const numOfDays = new Date(this.year, this.monthIndex + 1, 0).getDate();
    //console.log('numOfDays=' + numOfDays);

    for (let i = 1; i <= numOfDays; i++) {
      if (cols === 7) {
        row++;
        this.dateObj[row] = [];
        cols = 0;
      }
      const dateInMonth = new DateInMonth();
      const dateNew =  new Date(this.year, this.monthIndex, i );
      dateInMonth.date = dateNew.toLocaleDateString('en-GB');
      dateInMonth.enabled = true;

      //console.log('dateInMonth.date' + dateInMonth.date);

      this.dateObj[row][cols] = dateInMonth;
      cols++;
    }

    let totalCells = this.lastMonthDays + 1  + numOfDays;

    for (let i = 1; totalCells < 42; i++) {
      if (cols === 7) {
        row++;
        this.dateObj[row] = [];
        cols = 0;
      }
      const nextdateInMonth = new DateInMonth();
      const nextdateNew =  new Date(this.year, this.monthIndex + 1, i );
      nextdateInMonth.date = nextdateNew.toLocaleDateString('en-GB');
      nextdateInMonth.enabled = true;

      //console.log('nextdateInMonth.date' + nextdateInMonth.date);

      this.dateObj[row][cols] = nextdateInMonth;
      cols++;
      totalCells++;
    }

    this.holidayInitializer();

    //console.log(this.dateObj.length);

    //console.log(this.dateObj);

    //console.log(this.currentMonth);

  }


  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  async holidayInitializer()  {
   await this.holidayServiceObj.getHolidays(this.city, this.monthIndex , this.year)
    .subscribe( data => {this.responseDateObjs = data; });

  //  console.log(this.responseDateObjs);

    //for (let value of this.responseDateObjs.values()){
      //console.log(value.date);
      //console.log(value.holidayName);
    //}

  }
  get getlocalHolidays() {
    return Array.from(this.responseDateObjs.values());
  }

}

