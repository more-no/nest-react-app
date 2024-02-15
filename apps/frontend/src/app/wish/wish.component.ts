import { Component } from '@angular/core';

import { WishItem } from '../../shared/models/wishItem';
import { EventService } from '../../shared/services/EventService';
import { WishService } from './../wish/wish.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.sass',
})
export class WishComponent {
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

  filter: any;
}
