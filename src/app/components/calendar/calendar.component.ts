import { Component } from '@angular/core';
import { CalendarConfig } from '../../models/CalendarConfig.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  public currentDate: Date;
  public year: number;
  public months: Date[][][];
  public monthsConfig: CalendarConfig[];
  public monthsInYear: number;
  public weekLength: number;

  constructor() {
    this.currentDate = new Date(new Date().toISOString());
    this.year = this.currentDate.getFullYear();
    this.weekLength = 7;
    this.months = [];
    this.monthsInYear = 12;
    this.monthsConfig = Array.from({ length: 12 }, (v, k) => {
      const firstDayOfMonth = new Date(this.year, k, 1);
      const lastDayOfMonth = new Date(this.year, k + 1, 0);
      return {
        monthIndex: k,
        lastDayOfMonth: lastDayOfMonth.getDate(),
        firstDayOfMonthIndex: firstDayOfMonth.getDay(),
        lastDayOfMonthIndex: lastDayOfMonth.getDay(),
      };
    });
  }

  ngOnInit(): void {
    let monthIndex = 0;
    this.mountCalendarMonth(this.monthsConfig[monthIndex], monthIndex);
  }

  mountCalendarMonth(config: CalendarConfig, monthIndex: number) {
    const arrDays: Date[] = Array.from(
      { length: config.lastDayOfMonth },
      (v, k) => new Date(this.year, config.monthIndex, k + 1)
    );
    const [daysOfPreviousMonth, daysOfNextMonth] =
      this.getAdjacentDaysMonth(config);
    this.fillPreviousMonthDays(arrDays, daysOfPreviousMonth, config);
    this.fillNextMonthDays(arrDays, daysOfNextMonth, config);
    let month = this.groupedDaysByWeek(arrDays, this.weekLength);
    this.months.push(month);
    monthIndex++;
    if (monthIndex < this.monthsInYear)
      this.mountCalendarMonth(this.monthsConfig[monthIndex], monthIndex);
  }

  groupedDaysByWeek(array: Date[], columnCount: number) {
    let column = Array.from(
      { length: Math.ceil(array.length / columnCount) },
      (_, i) => array.slice(i * columnCount, i * columnCount + columnCount)
    );
    return column;
  }

  getAdjacentDaysMonth(config: CalendarConfig) {
    let daysOfPreviousMonth = config.firstDayOfMonthIndex;
    let numberDays =
      config.lastDayOfMonthIndex == 0
        ? this.weekLength - 1
        : config.lastDayOfMonthIndex;
    let daysOfNextMonth =
      config.lastDayOfMonthIndex == 0
        ? numberDays
        : this.weekLength - 1 - numberDays;
    return [daysOfPreviousMonth, daysOfNextMonth];
  }

  fillPreviousMonthDays(arrDays: Date[], i: number, config: CalendarConfig) {
    let date = new Date(this.year, config.monthIndex, 1);
    while (i > 0) {
      arrDays.unshift(new Date(date.setDate(date.getDate() - 1)));
      i--;
    }
    return arrDays;
  }

  fillNextMonthDays(arrDays: Date[], i: number, config: CalendarConfig) {
    let date = new Date(this.year, config.monthIndex, config.lastDayOfMonth);
    while (i > 0) {
      arrDays.push(new Date(date.setDate(date.getDate() + 1)));
      i--;
    }
  }
}
