import { Component } from '@angular/core';
import { WishItem } from '../shared/models/wishItem';
import { EventService } from '../shared/services/EventService';

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

  constructor(event: EventService) {
    event.listen('removeWish', (wish: any) => {
      let index = this.items.indexOf(wish);
      this.items.splice(index, 1);
    });
  }

  // this is simplified with the two-way binding in the app.component.html in wish-filter
  // filter: any = () => {};
  filter: any;

  // moved directly in app.component.html
  // get visibleItems(): WishItem[] {
  //   return this.items.filter(this.filter);
  // }
}
