export class CalendarConfig {
  public monthTitle: string;
  public monthIndex: number;
  public lastDayOfMonth: number;
  public firstDayOfMonthIndex: number;
  public lastDayOfMonthIndex: number;

  constructor(
    monthTitle: string,
    monthIndex: number,
    lastDayOfMonth: number,
    firstDayOfMonthIndex: number,
    lastDayOfMonthIndex: number
  ) {
    this.monthTitle = monthTitle;
    this.monthIndex = monthIndex;
    this.lastDayOfMonth = lastDayOfMonth;
    this.firstDayOfMonthIndex = firstDayOfMonthIndex;
    this.lastDayOfMonthIndex = lastDayOfMonthIndex;
  }
}
