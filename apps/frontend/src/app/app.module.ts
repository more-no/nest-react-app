import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//       moved to wish.module
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//      moved to wish.module
// import { WishListComponent } from './wish/wish-list/wish-list.component';
// import { AddWishFormComponent } from './wish/add-wish-form/add-wish-form.component';
// import { WishFilterComponent } from './wish/wish-filter/wish-filter.component';
// import { WishListItemComponent } from './wish/wish-list-item/wish-list-item.component';
//      finally we import the WishModule where we moved all the wish-logic
import { WishModule } from './wish/wish.module';
import { ContactModule } from './contact/contact.module';

@NgModule({
  declarations: [
    // AppComponent is the entry point of our Module
    AppComponent,
    //      moved to wish.module
    // WishListComponent,
    // AddWishFormComponent,
    // WishFilterComponent,
    // WishListItemComponent,
  ],
  //      obviously the WishModule must be added to the imports
  imports: [BrowserModule, AppRoutingModule, WishModule, ContactModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
