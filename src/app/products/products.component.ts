import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatagridComponent } from '../shared/datagrid/datagrid.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Store } from '@ngxs/store';
import { FormComponent } from './form/form.component';
import { Observable } from 'rxjs';
import { DeleteAction, SetSelectedItem } from '../state/app.actions';
import { ConfirmDialogComponent } from '../shared/confirmDialog/confirmDialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ButtonModule, DatagridComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products$!: Observable<any[]>;
  ref: DynamicDialogRef | undefined;
  cols = [
    {
      field: 'id',
      header: 'Code',
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'category',
      header: 'Category',
    },
    {
      field: 'quantity',
      header: 'Quantity',
    },
  ];
  tableData = [];

  constructor(private dialogService: DialogService, private store: Store) {
    this.products$ = this.store.select((state) => state.auth);
    this.products$.subscribe((a: any) => (this.tableData = a?.products));
  }

  handleDialog(title: string, data?: any) {
    this.ref = this.dialogService.open(FormComponent, {
      header: title,
      width: '15vw',
      data: data,
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

  editProduct = (product: any) => {
    this.store.dispatch(new SetSelectedItem(product)).subscribe((r) => {
      this.handleDialog('Edit Product', product)
    })
  };

  deleteProduct = (product: any) => {
    this.store.dispatch(new DeleteAction('products',product.id)).subscribe((r) => {
      this.dialogService.open(ConfirmDialogComponent, {
        width: '15vw',
        data: {
          header: "Porduct deleted",
        }
      });
    })
  };
}
