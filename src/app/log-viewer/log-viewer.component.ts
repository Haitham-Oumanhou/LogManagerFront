import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { LogEntry } from '../log-entry';
import { LogService } from '../log.service';
import { LogStateService } from '../log-state.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule,
  ],
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss'],
})
export class LogViewerComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'frequency',
    'timestamp',
    'label',
    'service',
    'method_name',
    'message',
  ];
  dataSource: MatTableDataSource<LogEntry>;
  private logSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private logService: LogService,
    private logStateService: LogStateService
  ) {
    this.dataSource = new MatTableDataSource<LogEntry>(
      this.logStateService.logEntries
    );
  }

  ngOnInit(): void {
    this.logSubscription = this.logService
      .getLogEntries()
      .subscribe((logEntry: LogEntry) => {
        this.logStateService.addLogEntry(logEntry)
        this.dataSource.data = [...this.logStateService.logEntries]
      });
  }

  ngOnDestroy(): void {
    this.logSubscription.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
