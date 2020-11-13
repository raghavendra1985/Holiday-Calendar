import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HolidayService } from '../services/holiday.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // assign selected city to selectedCity
  selectedCity: string = null;

  // use year to display year
  year;

  // add month names in monthInAlphabets Array
  monthInAlphabets: Array<any> =  ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

  // Use month index to get month in monthInAlphabets
  monthIndex = 0;

isLeftMonthDisabled: boolean;
isRightMonthDisabled: boolean;
isRightYearDisabled:boolean;
isLeftYearDisabled:boolean;

  // get cities and assign it to cities
  cities: Array<any>;

  constructor(public dialog: MatDialog, private holidayServiceObj: HolidayService, private route: Router) {

  }

  /**
   * Set the current month index to monthIndex and set current year to year
   * get cities
   */
  ngOnInit() {
    this.year = new Date().getFullYear();
    this.monthIndex = new Date().getMonth();
  }

  /**
   *  To navigate month
   *  if "flag" is 0 which means that user click left arrow key <-
   *  if "flag" is 1 which means that user click right arrow key ->
   */
  navigationArrowMonth(flag) {
      return this.monthNavigatorValidation(flag);
  }

  /**
   *  To navigate year
   *  if "flag" is 0 which means that user onclick left arrow key <-
   *  if "flag" is 1 which means that user onclick right arrow key ->
   */
  navigationArrowYear(flag) {
      return this.yearNavigatorValidation(flag);
  }

  /**
   * To disable navigation for month
   * Return true to disable
   * Return false to enable
   */
  monthNavigatorValidation(flag?) {
      if(flag) {
      this.isLeftMonthDisabled = false;
      this.monthIndex = this.monthIndex + 1;
     if(this.monthIndex === 12) {
      this.isRightMonthDisabled = true;
      return false;
     } else {
      return true;
     }
   } else {
     this.isRightMonthDisabled = false;
     this.monthIndex = this.monthIndex - 1;

    if(this.monthIndex === 1) {
     this.isLeftMonthDisabled = true;
     return false;
    } else {
     return true;
   }
  }
  }

  /**
   * To disable navigation for year
   * return true to disable
   * return false to enable
   */
  yearNavigatorValidation(flag?) {
    if(flag) {
      this.isLeftYearDisabled = false;
      this.year = this.year + 1;
     if(this.year === new Date().getFullYear()) {
      this.isRightYearDisabled = true;
      return false;
     } else {
      return true;
     }
   } else {
     this.isRightYearDisabled = false;
     this.year = this.year - 1;

    if(this.year === 1900) {
     this.isLeftYearDisabled = true;
     return false;
    } else {
     return true;
   }
  }

  }

  // Get cities list and assign the response value to cities
  getCities() {
      this.holidayServiceObj.getCities().subscribe(
        data => this.cities = data
      );
  }


}
