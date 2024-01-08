import { Component } from '@angular/core';
import { WishItem } from '../shared/models/wishItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  items: WishItem[] = [
    // here we're using the constructor build in wishItem
    new WishItem('Learn angular'),
    new WishItem('Get coffee', true),
    new WishItem('Find grass that cuts itself'),
  ];

  filter: any = () => {};

  // moved directly in app.component.html
  get visibleItems(): WishItem[] {
    return this.items.filter(this.filter);
  }
}
