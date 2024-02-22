import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input() year: number;
  @Input() month: number;
  public lastDayOfMonthFullDate: Date;
  public firstDayOfMonthFullDate: Date;
  public daysWithWeekday: number[][] = [];
  public calendarMonth: number[][] = [];

  constructor() {
    let date = new Date(
      'Mon Jan 01 2024 00:00:00 GMT-0300 (Horário Padrão de Brasília)'
    );
    this.year = new Date(date).getFullYear();
    this.month = new Date(date).getMonth();
    this.firstDayOfMonthFullDate = new Date(this.year, this.month, 1);
    this.lastDayOfMonthFullDate = new Date(this.year, this.month, 0);
  }

  ngOnInit(): void {
    this.mountCalendar();
    
  }

  mountCalendar() {
    let daysOfMonth = this.getDaysOfMonth(
      this.firstDayOfMonthFullDate.getDate(),
      this.lastDayOfMonthFullDate
    );
    this.calendarMonth = this.groupDaysOfMonthByWeek(daysOfMonth);
    //this.fillAdjacentDays(firstWeek, filledDaysFirstWeek);
    //  let firstWeek = this.calendarMonth[0];
    //  let lastWeek = this.calendarMonth[this.calendarMonth.length - 1];
  }

  getDaysOfMonth(day: number, lastDayOfMonthFullDate: Date): number[][] {
    let date = lastDayOfMonthFullDate;
    date = new Date(date.getFullYear(), date.getMonth(), day);
    let lastDayOfMonth = lastDayOfMonthFullDate.getDate();
    let dayWithWeekday = [
      new Date(date).getUTCDay(),
      new Date(date.setDate(date.getDate())).getDate(),
    ];
    this.daysWithWeekday.push(dayWithWeekday);

    if (day == lastDayOfMonth) {
      return this.daysWithWeekday;
    } else {
      day++;
      return this.getDaysOfMonth(day, lastDayOfMonthFullDate);
    }
  }

  groupDaysOfMonthByWeek(daysOfMonth: number[][]): number[][] {
    let month: number[][] = [];
    let week: number[] = [];

    daysOfMonth.forEach((element) => {
      let [weekday, day] = element;
      weekday = weekday == 0 ? 7 : weekday;
      week[weekday - 1] = day;
      let lastDayWasPushed = week.at(-1) == daysOfMonth.at(-1)?.at(1);
      if (weekday == 7 || lastDayWasPushed) {
        month.push(week);
        week = [];
      }
    });
    return month;
  }

  fillAdjacentDays(week: number[], weekday: number, count: number = 1) {
    let data = new Date(this.year, this.month - 1, 1);
    console.log('data ', new Date(data).getUTCDay());
    let index = weekday + 1;
    for (let i = 0; i < index; i++) {
      if (week[weekday] == undefined) {
        week[weekday] = new Date(
          data.setDate(data.getDate() - count)
        ).getDate();
      }
      weekday--;
    }
  }
}
