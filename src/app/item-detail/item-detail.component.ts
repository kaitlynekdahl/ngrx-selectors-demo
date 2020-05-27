import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromInventoryState from '../store';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  currentItem$!: Observable<any>;
  inStock$!: Observable<number>;
  shopForm = this.formBuilder.group({});
  routeParams$ = this.route.params;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inStock$ = this.routeParams$.pipe(
      switchMap((params) =>
        this.store.pipe(
          select(fromInventoryState.selectInStock, {
            itemId: params['itemId'],
          })
        )
      )
    );

    this.currentItem$ = this.routeParams$.pipe(
      switchMap((params) =>
        // this.store.pipe(
        //   select(fromInventoryState.selectItemById, {
        //     itemId: params['itemId'],
        //   })
        // )

        // alternative to selector using RxJS operator
        this.store.pipe(fromInventoryState.getItemFromStore(params['itemId']))
      ),
      tap((currentItem) => {
        // when store is modified, reset form controls
        this.shopForm = this.formBuilder.group({
          [currentItem.id]: [0, [Validators.min(0)]],
        });
      })
    );
  }

  submitCheckout() {
    const control = Object.keys(this.shopForm.controls)[0];

    const purchased = {
      itemIdToPurchase: control,
      amountToPurchase: parseInt(this.shopForm.controls[control].value),
    };

    this.store.dispatch(fromInventoryState.confirmPurchase(purchased));
  }
}
