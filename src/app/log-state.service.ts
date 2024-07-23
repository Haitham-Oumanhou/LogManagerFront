import { Injectable } from '@angular/core';
import { LogEntry } from './log-entry';

@Injectable({
  providedIn: 'root',
})
export class LogStateService {
  private _logEntries: LogEntry[] = [];

  get logEntries(): LogEntry[] {
    return this._logEntries;
  }

  set logEntries(entries: LogEntry[]) {
    this._logEntries = entries;
  }

  addLogEntry(entry: LogEntry) {
    if (this._logEntries.length >= 100) {
      this._logEntries.shift();
    }
    this._logEntries.push(entry);
  }
}
