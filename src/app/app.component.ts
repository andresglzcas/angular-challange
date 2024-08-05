import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LoginComponent } from './login/login.component';
import { StateService } from './services/state.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [NxWelcomeComponent, LoginComponent, MenubarModule, RouterModule],
  providers: [StateService, DialogService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular_challenge';
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/'
      },
      {
        label: 'Users',
        icon: 'pi pi-users',
        routerLink: '/usuarios'
      },
      {
        label: 'Products',
        icon: 'pi pi-box',
        routerLink: '/productos'
      },
      {
        label: 'Categories',
        icon: 'pi pi-file',
         routerLink: '/categories'
      }
    ];
  }
}
