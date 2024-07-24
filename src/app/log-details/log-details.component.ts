import { Component, inject, Inject, ViewChild } from '@angular/core';
import { LogService } from '../log.service';
import { CommonModule } from '@angular/common';
import { LogEntry } from '../log-entry';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule,
    DatePipe,
    CommonModule,
  ],
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.scss'],
})
export class DetailsComponent {
  httpDatasource = new MatTableDataSource<LogEntry>([]);
  logService: LogService = inject(LogService);

  displayedColumns: string[] = [
    'frequency',
    'timestamp',
    'label',
    'service',
    'method_name',
    'message',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.logService.getLogsViaHttpRequest().then((logEntryList: LogEntry[]) => {
      this.httpDatasource.data = logEntryList;
    });
  }

  ngAfterViewInit() {
    this.httpDatasource.sort = this.sort;
    this.httpDatasource.paginator = this.paginator;
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.httpDatasource.filter = filterValue.trim().toLowerCase();

    if (this.httpDatasource.paginator) {
      this.httpDatasource.paginator.firstPage();
    }
  }
}
