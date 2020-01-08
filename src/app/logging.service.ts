import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoggingService {
  lastlog: string;

  constructor() {}

  printLog(message: string) {
    console.log(message, "<<MESSAGE");
    console.log(this.lastlog, "<<lastlog");
    this.lastlog = message;
  }
}
