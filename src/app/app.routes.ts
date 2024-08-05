import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  
    { path: '', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    { path: 'usuarios', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
    { path: 'productos', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
    { path: 'categories', loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent) },

];
