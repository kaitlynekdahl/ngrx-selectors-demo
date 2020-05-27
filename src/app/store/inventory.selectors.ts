import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { inventoryKey, State } from './inventory.reducer';
import { pipe } from 'rxjs';

export const selectShopState = createFeatureSelector<State>(inventoryKey);

export const selectShopName = createSelector(
  selectShopState,
  (state) => state.name
);

export const selectInventory = createSelector(
  selectShopState,
  (state) => state.inventory
);

export const selectInventoryNames = createSelector(
  selectInventory,
  (inventory) =>
    Object.values(inventory).map((item) => {
      const { id, displayName } = item;
      return { id, displayName };
    })
);

export const selectItemById = createSelector(
  selectShopState,
  (state, props) => state.inventory[props.itemId]
);

// same selector as above, as RxJS operator
export const getItemFromStore = (itemId: string) =>
  pipe(select(selectItemById, { itemId }));

// pass props to source selector
export const selectItemTotalStock = createSelector(
  (state, props) => selectItemById(state, props),
  (item) => item.totalStock
);

export const selectItemAmountPurchased = createSelector(
  (state, props) => selectItemById(state, props),
  (item) => item.amountPurchased
);

export const selectInStock = createSelector(
  (state, props) => selectItemTotalStock(state, props),
  (state, props) => selectItemAmountPurchased(state, props),
  (totalStock, amountPurchased) => totalStock - amountPurchased
);
