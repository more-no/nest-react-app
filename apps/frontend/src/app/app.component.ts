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
    //    now we can delete the hardcoded input, since we have a logic to add the manually
  ];
  title = 'frontend';

  // we select the 0 option as default value
  listFilter: String = '0';

  newWishText = '';

  visibleItems: WishItem[] = this.items;

  addNewWish() {
    // todo : add wish to the items array
    this.items.push(new WishItem(this.newWishText));
    // clear the text-box
    this.newWishText = '';
  }

  filterChanged(value: any) {
    if (value === '0') {
      this.visibleItems = this.items;
    } else if (value === '1') {
      this.visibleItems = this.items.filter((item) => !item.isComplete);
    } else if (value === '2') {
      this.visibleItems = this.items.filter((item) => item.isComplete);
    }
  }

  // here we can add the functions we need as methods
  toggleItem(item: WishItem) {
    item.isComplete = !item.isComplete;
    console.log(item);
  }
}
