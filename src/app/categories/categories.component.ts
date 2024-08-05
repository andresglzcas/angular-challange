import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatagridComponent } from '../shared/datagrid/datagrid.component';
import { Store } from '@ngxs/store';
import { FormComponent } from './form/form.component';
import { DeleteAction, SetSelectedItem } from '../state/app.actions';
import { ConfirmDialogComponent } from '../shared/confirmDialog/confirmDialog.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ButtonModule, DatagridComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories$!: Observable<any[]>;
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
      field: 'review',
      header: 'Review',
    },
    {
      field: 'slug',
      header: 'Slug',
    },
  ];
  tableData = [];
  constructor(private dialogService: DialogService, private store: Store) {
    this.categories$ = this.store.select((state) => state.auth);
    this.categories$.subscribe((a: any) => (this.tableData = a?.categories));
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
  
  editCategory = (category: any) => {
    this.store.dispatch(new SetSelectedItem(category)).subscribe((r) => {
      this.handleDialog('Edit Category', category)
    })
  };

  deleteCategory = (category: any) => {
    this.store.dispatch(new DeleteAction('categories',category.id)).subscribe((r) => {
      this.dialogService.open(ConfirmDialogComponent, {
        width: '15vw',
        data: {
          header: "Category deleted",
        }
      });
    })
  };
}
