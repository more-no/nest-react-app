import { Component, OnInit } from '@angular/core';
import { WishItem } from '../shared/models/wishItem';
import { EventService } from '../shared/services/EventService';
import { WishService } from './wish/wish.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  // we use the bang so we can not initialize it
  items: WishItem[] = [];

  constructor(
    event: EventService,
    private wishService: WishService,
  ) {
    event.listen('removeWish', (wish: any) => {
      let index = this.items.indexOf(wish);
      this.items.splice(index, 1);
    });
  }

  ngOnInit(): void {
    // here we can call the service we created getWishes
    // the get request returns an Observable, to which we must subscribe
    this.wishService.getWishes().subscribe(
      (data: any) => {
        this.items = data;
      },
      (error: any) => {
        alert(error.message);
      },
    );
  }

  // this is simplified with the two-way binding in the app.component.html in wish-filter
  // filter: any = () => {};
  filter: any;

  // moved directly in app.component.html
  // get visibleItems(): WishItem[] {
  //   return this.items.filter(this.filter);
  // }
}
