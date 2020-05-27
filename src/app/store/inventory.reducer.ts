import { Action, createReducer, on } from '@ngrx/store';
import { confirmPurchase } from './inventory.actions';

export const inventoryKey = 'shop';

export interface InventoryItem {
  id: string;
  displayName: string;
  description: string;
  category: 'healing' | 'weapon';
  totalStock: number;
  amountPurchased: number;
}

export interface State {
  name: string;
  inventory: {
    [id: string]: InventoryItem;
  };
}

const initialState: State = {
  name: 'Item Shop',
  inventory: {
    'healing-potion': {
      id: 'healing-potion',
      displayName: 'Healing Potion',
      description: 'Heals some health.',
      category: 'healing',
      totalStock: 20,
      amountPurchased: 3,
    },
    'colorful-feather': {
      id: 'colorful-feather',
      displayName: 'Colorful Feather',
      description: 'Revives a fallen friend.',
      category: 'healing',
      totalStock: 10,
      amountPurchased: 4,
    },
    'giant-sword': {
      id: 'giant-sword',
      displayName: 'Giant Sword',
      description: 'A strong sword used by a generic hero.',
      category: 'weapon',
      totalStock: 1,
      amountPurchased: 0,
    },
  },
};

const inventoryReducer = createReducer(
  initialState,
  on(confirmPurchase, (state, action) => {
    const itemToUpdate = state.inventory[action.itemIdToPurchase];
    return {
      ...state,
      inventory: {
        ...state.inventory,
        [action.itemIdToPurchase]: {
          ...itemToUpdate,
          amountPurchased:
            itemToUpdate.amountPurchased + action.amountToPurchase,
        },
      },
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return inventoryReducer(state, action);
}
