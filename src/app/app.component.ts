import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogEntry } from './log-entry';
import { LogService } from './log.service';
import { LogStateService } from './log-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  logEntries: LogEntry[] = [];

  constructor(
    private logService: LogService,
    private logStateService: LogStateService
  ) {}

  ngOnInit(): void {
    this.logService.getLogEntries().subscribe({
      next: (logEntry: LogEntry) => {
        this.logStateService.addLogEntry(logEntry);
        this.logEntries = this.logStateService.logEntries;
      },
      error: (error) => {},
    });
  }
}
