import { createAction, props } from '@ngrx/store';

export const confirmPurchase = createAction(
  '[Shop Inventory] Confirm Purchase',
  props<{ itemIdToPurchase: string; amountToPurchase: number }>()
);
