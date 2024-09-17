import { Routes } from '@angular/router';
import {PeriodicTableComponent} from "./periodic-element-table/periodic-element-table.component";

export const routes: Routes = [
  { path: '', redirectTo: 'periodic-element', pathMatch: 'full' }, //default route
  { path: 'periodic-element', component: PeriodicTableComponent },
];
