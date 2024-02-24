import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarSidebarComponent } from './components/calendar-sidebar/calendar-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    CalendarComponent,
    CalendarSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
