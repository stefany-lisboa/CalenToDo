import { Component, Input } from '@angular/core';
import { CalendarConfig } from '../../models/CalendarConfig.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input() date!: Date; 
  public currentDate!: Date;
  public year!: number;
  public months!: Date[][][];
  public monthIndex!: number;
  public monthsConfig!: CalendarConfig[];
  public monthsInYear!: number;
  public weekLength!: number;

  constructor() {
  }
  ngOnInit(): void {
    this.setCalendarValues(this.date)
    this.mountCalendarMonth(this.monthsConfig[0], 0);
  }

  setCalendarValues(date: Date) {
    this.currentDate = this.date;
    this.year = this.currentDate.getFullYear();
    this.monthIndex = this.currentDate.getMonth();
    this.weekLength = 7;
    this.months = [];
    this.monthsInYear = 12;
    this.monthsConfig = Array.from({ length: 12 }, (v, monthIndex) => {
      const firstDayOfMonth = new Date(this.year, monthIndex, 1);
      const lastDayOfMonth = new Date(this.year, monthIndex + 1, 0);
      return {
        monthTitle: firstDayOfMonth.toLocaleString('pt-BR', { month: 'long' }),
        monthIndex: monthIndex,
        lastDayOfMonth: lastDayOfMonth.getDate(),
        firstDayOfMonthIndex: firstDayOfMonth.getDay(),
        lastDayOfMonthIndex: lastDayOfMonth.getDay(),
      };
    });
  }

  mountCalendarMonth(config: CalendarConfig, monthIndex: number) {
    const arrDays: Date[] = Array.from(
      { length: config.lastDayOfMonth },
      (v, dayPosition) =>
        new Date(this.year, config.monthIndex, dayPosition + 1)
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
  isDayOfMonth(date: Date, monthIndex: number) {
    if (date.getMonth() != monthIndex) return false;
    return true;
  }

  capitalize = (e: string) => {
    return e.charAt(0).toUpperCase() + e.slice(1)
  };

  getPreviousMonth(monthIndex: number) {
    //
  }

  getNextMonth(monthIndex: number) {
    //    
  }
}
