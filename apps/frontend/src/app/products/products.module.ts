// created with 'ng g module products'

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './productsList/productsList.component';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule],
})
export class ProductsModule {}
