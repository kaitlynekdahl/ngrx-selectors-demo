import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailComponent } from './item-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromInventoryState from '../store';
import { jest } from '@jest/globals';

describe('ItemDetailComponent', () => {
  let component: ItemDetailComponent;
  let fixture: ComponentFixture<ItemDetailComponent>;
  let mockStore: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ItemDetailComponent],
      providers: [
        provideMockStore({
          initialState: { shop: { inventory: {} } },
          selectors: [
            {
              selector: fromInventoryState.selectInStock,
              value: 2,
            },

            {
              selector: fromInventoryState.selectItemById,
              value: { id: 'test-item' },
            },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of('test-item'),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.get(Store);

    // to mock an RxJS operator that wraps a selector, make a jest spy
    jest
      .spyOn(fromInventoryState, 'getItemFromStore')
      .mockImplementation((id) => () =>
        of({
          id: 'test-item',
          displayName: 'Test Item',
        })
      );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get item stock amount from store', (done) => {
    // use overrideSelector to change the expected value
    mockStore.overrideSelector(fromInventoryState.selectInStock, 16);

    component.inStock$.subscribe((stockAmount) => {
      expect(stockAmount).toEqual(16);
      done();
    });
  });
});
