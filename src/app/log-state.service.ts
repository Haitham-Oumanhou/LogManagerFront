import { Injectable } from '@angular/core';
import { LogEntry } from './log-entry';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogStateService {
  private _logEntries: BehaviorSubject<LogEntry[]> = new BehaviorSubject<LogEntry[]>([]);

  get logEntries$() {
    return this._logEntries.asObservable();
  }

  set logEntries(entries: LogEntry[]) {
    this._logEntries.next(entries);
  }

  addLogEntry(entry: LogEntry) {
    const currentEntries = this._logEntries.value;
    if (currentEntries.length >= 100) {
      currentEntries.shift();
    }
    currentEntries.push(entry);
    this._logEntries.next([...currentEntries]);
  }
}
