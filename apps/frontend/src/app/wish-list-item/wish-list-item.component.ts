import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WishItem } from '../../shared/models/wishItem';
import events from '../../shared/services/EventService';

@Component({
  selector: 'wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.sass',
})
export class WishListItemComponent {
  // bang operator => not null property
  @Input() wishText!: string;

  @Input() fulfilled!: boolean;
  @Output() fulfilledChange = new EventEmitter<boolean>();

  get cssClasses() {
    // return this.fulfilled ? ['strikeout', 'text-muted'] : [];
    // below we try using an object instead of an array
    return { 'strikeout text-muted': this.fulfilled };
  }

  removeWish() {
    events.emit('removeWish', this.wishText);
  }

  toggleFulfilled() {
    this.fulfilled = !this.fulfilled;
    this.fulfilledChange.emit(this.fulfilled);
  }
}
