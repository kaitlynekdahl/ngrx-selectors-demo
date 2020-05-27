import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
  {
    path: 'items',
    component: ItemListComponent,
  },
  {
    path: 'items/:itemId',
    component: ItemDetailComponent,
  },
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: '/items',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
