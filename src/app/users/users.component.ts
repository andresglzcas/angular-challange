import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DatagridComponent } from '../shared/datagrid/datagrid.component';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef
} from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { FormComponent } from './form/form.component';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../state/app.state';
import { DeleteAction, SetSelectedItem } from '../state/app.actions';
import { ConfirmDialogComponent } from '../shared/confirmDialog/confirmDialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    DatagridComponent,
    FormComponent,
    CardModule,
    ButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule 
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users$!: Observable<any[]>;
  ref: DynamicDialogRef | undefined;

  cols = [
    {
      field: 'id',
      header: 'Code',
    },
    {
      field: 'firstname',
      header: 'First Name',
    },
    {
      field: 'lastname',
      header: 'Last Name',
    },
    {
      field: 'age',
      header: 'Age',
    },
  ];
  tableData = [];

  constructor(private dialogService: DialogService, private store: Store) {
    this.users$ = this.store.select((state) => state.auth);
    this.users$.subscribe((a: any) => (this.tableData = a?.users));
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

  deleteUser = (user: any) => {
    this.store.dispatch(new DeleteAction('users',user.id)).subscribe((r) => {
      this.dialogService.open(ConfirmDialogComponent, {
        width: '15vw',
        data: {
          header: "Users deleted",
        }
      });
    })
  };

  editUser = (user: any) => {
    this.store.dispatch(new SetSelectedItem(user)).subscribe((r) => {
      this.handleDialog('Edit User', user)
    })
  };
}
