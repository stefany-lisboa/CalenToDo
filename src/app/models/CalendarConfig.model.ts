export class CalendarConfig {
  public monthIndex: number;
  public lastDayOfMonth: number;
  public firstDayOfMonthIndex: number;
  public lastDayOfMonthIndex: number;

  constructor(
    monthIndex: number,
    lastDayOfMonth: number,
    firstDayOfMonthIndex: number,
    lastDayOfMonthIndex: number
  ) {
    this.monthIndex = monthIndex;
    this.lastDayOfMonth = lastDayOfMonth;
    this.firstDayOfMonthIndex = firstDayOfMonthIndex;
    this.lastDayOfMonthIndex = lastDayOfMonthIndex;
  }
}
