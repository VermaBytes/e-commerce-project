import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { LaptopsComponent } from './products-page/laptops-components/laptops-components';
import { MacBooksComponents } from './products-page/mac-books-components/mac-books-components';
import { PrintersComponents } from './products-page/printers-components/printers-components';
import { KeyboardsComponents } from './pages/cotegory/keyboards-components/keyboards-components';
import { MouseComponents } from './products-page/mouse-components/mouse-components';
import { RoutersComponent } from './products-page/routers-component/routers-component';
import { PendrivesComponent } from './products-page/pendrives-component/pendrives-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'laptops', component: LaptopsComponent },

  { path: 'macbooks', component: MacBooksComponents },

  { path: 'printers', component: PrintersComponents },

  { path: 'keyboards', component: KeyboardsComponents },

  { path: 'mouses', component: MouseComponents },

  { path: 'routers', component: RoutersComponent },

  { path: 'pendrives', component: PendrivesComponent },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/products-Details-page/product-details/product-details').then(
        (m) => m.ProductDetailsComponent,
      ),
  },

  {
    path: 'cart',
    loadComponent: () => import('./pages/cart-pages/cart/cart').then((m) => m.CartComponent),
  },

  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout-pages/checkout/checkout').then((m) => m.CheckoutComponent),
  },

  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/Orders-page/order-success/order-success').then((m) => m.OrderSuccess),
  },

  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/dashboard/dashboard').then((m) => m.Dashboard),
  },

  {
    path: 'products',
    loadComponent: () => import('./pages/admin/products/products').then((m) => m.ProductsComponent),
  },

  {
    path: 'add-product',
    loadComponent: () =>
      import('./pages/admin/add-product/add-product').then((m) => m.AddProductComponent),
  },

  {
    path: 'admin/edit-product/:id',
    loadComponent: () =>
      import('./pages/admin/edit-product/edit-product').then((m) => m.EditProductComponent),
  },

  // {
  //  path:'category/:name',
  //  loadComponent:()=>import('./pages/category/laptops-components/laptops-components')
  //  .then(m=>m.laptopsComponents)
  //  },
];
