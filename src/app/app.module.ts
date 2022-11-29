import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './add-user/add-user.component';
// import {default as database} from './database.json'
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { LogService }
    from './shared/log.service';
import { LogTestComponent }
    from './log-test/log-test.component';
import { EditUserComponent } from './edit-user/edit-user.component';





@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    HomeComponent,
    AddUserComponent,
    LogTestComponent,
    EditUserComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    
  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
