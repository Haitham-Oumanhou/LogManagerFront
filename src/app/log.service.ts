// src/app/log.service.ts
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LogEntry } from './log-entry';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private socket!: WebSocket;
  private logSubject: Subject<LogEntry> = new Subject<LogEntry>();

  private url = 'http://localhost:8080/api/logs';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.connect();
    }
  }

  private connect() {
    this.socket = new WebSocket('ws://localhost:8080/log');
    this.socket.onmessage = (event) => {
      this.zone.run(() => {
        const logEntry: LogEntry = JSON.parse(event.data);
        this.logSubject.next(logEntry);
      });
    };
  }

  getLogEntries(): Observable<LogEntry> {
    return this.logSubject.asObservable();
  }

  async getLogsViaHttpRequest(): Promise<LogEntry[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
}
