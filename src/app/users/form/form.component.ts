import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngxs/store';
import { AddAction, UpdateAction } from '../../state/app.actions';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog'; 
import { ConfirmDialogComponent } from 'src/app/shared/confirmDialog/confirmDialog.component';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  userForm!: FormGroup;
  dataForm!: any;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private DynamicDialogRef: DynamicDialogRef,
    private DynamicDialogConfig: DynamicDialogConfig,
    private dialogService: DialogService
  ) {
    this.dataForm = this.DynamicDialogConfig.data;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      id: this.dataForm ? this.dataForm.id : Date.now().toString(36),
      firstname: [
        this.dataForm ? this.dataForm.firstname : '',
        Validators.required,
      ],
      lastname: [
        this.dataForm ? this.dataForm.lastname : '',
        Validators.required,
      ],
      age: [this.dataForm ? this.dataForm.age : '', Validators.required],
    });
  }

  onSubmit(form: FormGroup) {
    if (this.dataForm) {
      this.store.dispatch(new UpdateAction(form.value)).subscribe((r) => {
        this.dialogService.open(ConfirmDialogComponent, {
          width: '15vw',
          data: {
            header: "User Updated",
          }
        });
      });
    } else {
      this.store.dispatch(new AddAction('users',form.value)).subscribe((r) => {
        this.dialogService.open(ConfirmDialogComponent, {
          width: '15vw',
          data: {
            header: "User Added",
          }
        });
      });;
    }
    this.DynamicDialogRef.destroy();
  }
}
