import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmDialog.component.html',
  styleUrl: './confirmDialog.component.css',
})
export class ConfirmDialogComponent {
  message: any;
  constructor(
    private DynamicDialogRef: DynamicDialogRef,
    private DynamicDialogConfig: DynamicDialogConfig
  ) {
    this.message = this.DynamicDialogConfig.data;
  }
}
