import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle, MatDialogActions
} from '@angular/material/dialog';
import { PeriodicElement } from "../periodic-element-table/periodic-element-table.component";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-periodic-element-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    MatDialogActions,
    MatButton,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './periodic-element-dialog.component.html',
  styleUrl: './periodic-element-dialog.component.scss'
})
export class PeriodicElementDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PeriodicElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
