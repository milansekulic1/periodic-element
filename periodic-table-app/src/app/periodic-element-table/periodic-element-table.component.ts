import {Component, OnInit} from "@angular/core";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {PeriodicElementDialogComponent} from "../periodic-element-dialog/periodic-element-dialog.component";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-periodic-element-table',
  standalone: true,
  imports: [
    MatFormField,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatInput,
    MatIcon,
    MatIconButton,
    MatHeaderRowDef,
    MatRowDef,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './periodic-element-table.component.html',
  styleUrl: './periodic-element-table.component.scss',
  host: {ngSkipHydration: 'true'},
})

export class PeriodicTableComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filteredData: PeriodicElement[] = ELEMENT_DATA;
  loader = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    // Simulation of loading data, this should depend on the api request, but for now we wait an arbitrary few seconds for the data to be loaded
    setTimeout(() => {
      this.loader = true;
    }, 2000)
  }

// Open dialog to edit the periodic element
  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(PeriodicElementDialogComponent, {
      width: '250px',
      data: {...element}  // This is a copy of the element to avoid mutation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // This is an update of the data with a new copy after edit
        const index = this.dataSource.data.findIndex(el => el.position === result.position);
        if (index !== -1) {
          const updatedData = [...this.dataSource.data];
          updatedData[index] = result;
          this.dataSource.data = updatedData;
          this.filteredData = updatedData;
        }
      }
    });
  }

  // Filter logic with a debounce of 2 seconds, another way is to use lodash lib but in the background it is timeout on input change
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    setTimeout(() => {
      this.filteredData = this.dataSource.data.filter(element =>
        Object.values(element).some(val => val.toString().toLowerCase().includes(filterValue))
      );
    }, 2000);  // 2 seconds debounce
  }
}

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
