import { Component } from '@angular/core';
import { WishItem } from '../shared/models/wishItem';

const filters = [
  (item: WishItem) => item,
  (item: WishItem) => !item.isComplete,
  (item: WishItem) => item.isComplete,
];

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
  // to work with the getter and the "filters" array we change the Type to number
  listFilter: number = 0;

  newWishText = '';

  get visibleItems(): WishItem[] {
    return this.items.filter(filters[this.listFilter]);
  }

  //       THIS can be further improved by creating an array with our filters and simply returning the result of the correct filter 8select as [0] or [1] or [2] in the array)
  // we transform the visibleItems array in a getter, so that updates every time the
  // get visibleItems(): WishItem[] {
  //   let value = this.listFilter;
  //
  //   if (value === '0') {
  //     return this.items;
  //   } else if (value === '1') {
  //     return this.items.filter((item) => !item.isComplete);
  //   } else {
  //     return this.items.filter((item) => item.isComplete);
  //   }
  // }

  addNewWish() {
    // todo : add wish to the items array
    this.items.push(new WishItem(this.newWishText));
    // clear the text-box
    this.newWishText = '';
  }

  //  ===>    we moved this logic inside the getter visibleItems
  //  visibleItems : WishItem[] = this.items;
  //
  // filterChanged(value: any) {
  //   if (value === '0') {
  //     this.visibleItems = this.items;
  //   } else if (value === '1') {
  //     this.visibleItems = this.items.filter((item) => !item.isComplete);
  //   } else {
  //     this.visibleItems = this.items.filter((item) => item.isComplete);
  //   }
  // }

  // here we can add the functions we need as methods
  toggleItem(item: WishItem) {
    item.isComplete = !item.isComplete;
    console.log(item);
  }
}
