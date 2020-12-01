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

isLeftMonthDisabled: boolean = false;
isRightMonthDisabled: boolean = false;
isRightYearDisabled:boolean = false;
isLeftYearDisabled:boolean = false;

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
    //this.isRightYearDisabled = true;
    this.monthIndex = new Date().getMonth();
    this.getCities();
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
      if (this.monthIndex === 11 ){
        this.monthIndex = 0;
        this.year = this.year + 1;
        //this.isRightMonthDisabled = true;
        return true;
      }
      this.monthIndex = this.monthIndex + 1;
      return true;
    } 
    else {
      this.isRightMonthDisabled = false;
      this.monthIndex = this.monthIndex - 1;

      if(this.monthIndex === -1) {
        this.monthIndex = 11;
        this.year = this.year - 1;
        return true;
    }
      return true;
    }
    }

  /**
   * To disable navigation for year
   * return true to disable
   * return false to enable
   */
  yearNavigatorValidation(flag?) {
    if(flag) {
        this.year = this.year + 1;
        return true;
    } else {
      this.year = this.year - 1;
      return true;
      }
  }

  // Get cities list and assign the response value to cities
  getCities() {
      this.holidayServiceObj.getCities().subscribe(
        data => this.cities = data
      );
  }


}
