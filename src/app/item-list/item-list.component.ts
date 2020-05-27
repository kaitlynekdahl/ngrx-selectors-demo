import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromInventoryState from '../store';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  shopInventoryList$ = this.store.pipe(
    select(fromInventoryState.selectInventoryNames)
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
