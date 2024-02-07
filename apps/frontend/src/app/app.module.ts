import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WishModule } from './wish/wish.module';
import { ContactModule } from './contact/contact.module';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsModule } from './products/products.module';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { SignupModule } from './auth/signup/signup.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    NotFoundComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignupModule,
    WishModule,
    ContactModule,
    ProductsModule,
    HttpClientModule,
    GraphQLModule,
    AuthModule,
  ],
})
export class AppModule {}
