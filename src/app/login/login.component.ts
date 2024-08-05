import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { Store } from '@ngxs/store';
import { AddAction } from '../state/app.actions';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, PanelModule, IconFieldModule, InputIconModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
 constructor(private store: Store){}
  add(){
    let uid= Date.now().toString(36);
    this.store.dispatch(new AddAction('token', uid));
  }
}
