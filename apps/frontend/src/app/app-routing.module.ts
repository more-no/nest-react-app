import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { WishComponent } from './wish/wish.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: FirstComponent }, // empty path is taken as homepage
  { path: 'second', component: SecondComponent },
  { path: 'wish', component: WishComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
