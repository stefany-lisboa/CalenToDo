import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public date: Date
  constructor() {
    this.date = new Date(new Date("2024, 11, 01").toISOString());
  }
}
