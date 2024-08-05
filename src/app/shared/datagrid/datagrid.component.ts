import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.css',
})
export class DatagridComponent {
  @Input() data!: any[];
  @Input() cols!: any[];
  @Input() editFcn: (args: any) => void;
  @Input() deleteFcn: (args: any) => void;
  onInit(){
    console.log(this.data)
  }

  onEvent(){
    this.editFcn('');
    this.deleteFcn('');

  }

}
