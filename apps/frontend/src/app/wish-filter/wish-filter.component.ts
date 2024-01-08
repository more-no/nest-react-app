import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WishItem } from '../../shared/models/wishItem';

const filters = [
  (item: WishItem) => item,
  (item: WishItem) => !item.isComplete,
  (item: WishItem) => item.isComplete,
];

@Component({
  // delete the "app-"
  selector: 'wish-filter',
  templateUrl: './wish-filter.component.html',
  styleUrl: './wish-filter.component.sass',
})
export class WishFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<any>();

  // we pass the initial value changeFilter - is it used on first mounting?
  ngOnInit(): void {
    this.changeFilter('0');
  }

  listFilter: number = 0;

  changeFilter(value: any) {
    this.filter.emit(filters[value]);
  }
}
