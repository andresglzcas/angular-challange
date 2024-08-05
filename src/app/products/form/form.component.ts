import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngxs/store';
import { AddAction, UpdateAction } from '../../state/app.actions';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog'; 
import { ConfirmDialogComponent } from 'src/app/shared/confirmDialog/confirmDialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, DropdownModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  categories$!: Observable<any[]>;
  options!: any[];
  productForm!: FormGroup;
  dataForm!: any;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private DynamicDialogRef: DynamicDialogRef,
    private DynamicDialogConfig: DynamicDialogConfig,
    private dialogService: DialogService
  ) {
    this.dataForm = this.DynamicDialogConfig.data;
   
      this.categories$ = this.store.select((state) => state.auth);
      this.categories$.subscribe((a: any) => (this.options = a?.categories));
   
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      id: this.dataForm ? this.dataForm.id : Date.now().toString(36),
      name: [
        this.dataForm ? this.dataForm.name : '',
        Validators.required,
      ],
      category: [
        this.dataForm ? this.dataForm.category : '',
        Validators.required,
      ],
      quantity: [this.dataForm ? this.dataForm.quantity : '', Validators.required],
    });
  }

  onSubmit(form: FormGroup) {
    if (this.dataForm) {
      this.store.dispatch(new UpdateAction(form.value)).subscribe((r) => {
        this.dialogService.open(ConfirmDialogComponent, {
          width: '15vw',
          data: {
            header: "Prpduct Updated",
          }
        });
      });
    } else {
      this.store.dispatch(new AddAction('products',form.value)).subscribe((r) => {
        this.dialogService.open(ConfirmDialogComponent, {
          width: '15vw',
          data: {
            header: "Product Added",
          }
        });
      });;
    }
    this.DynamicDialogRef.destroy();
  }
}
