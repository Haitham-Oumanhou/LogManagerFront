import { Routes } from '@angular/router';

import { LogViewerComponent } from './log-viewer/log-viewer.component';
import { DetailsComponent } from './log-details/log-details.component';

export const routes: Routes = [
  { path: '', component: LogViewerComponent },
  { path: 'details', component: DetailsComponent },
];
