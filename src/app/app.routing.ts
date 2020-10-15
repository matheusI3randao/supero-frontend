import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/book' },
  { path: 'book', loadChildren: () => import('./pages/book/book.module').then(m => m.BookModule) },
  { path: 'book/cadastrar', loadChildren: () => import('./pages/book/add-book/add-book.module').then(m => m.AddBookModule) },
  { path: 'book/editar/:id', loadChildren: () => import('./pages/book/add-book/add-book.module').then(m => m.AddBookModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
