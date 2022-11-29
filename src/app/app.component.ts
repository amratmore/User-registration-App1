import { Component } from '@angular/core';
import { NGXLogger } from "ngx-logger";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserReg';
  constructor(private logger: NGXLogger) {
    this.logger.error("Your log message goes here");
    this.logger.warn("Multiple", "Argument", "support");
  }
}
