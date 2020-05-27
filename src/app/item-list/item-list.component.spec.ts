import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { ItemListComponent } from './item-list.component';
import * as fromInventoryState from '../store';

import { RouterTestingModule } from '@angular/router/testing';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ItemListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({
          initialState: { shop: {} },
          selectors: [
            {
              selector: fromInventoryState.selectInventoryNames,
              value: [
                {
                  id: 'test-item',
                  displayName: 'Test Item',
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have item name data from the store', (done) => {
    component.shopInventoryList$.subscribe((itemNameData: any) => {
      expect(itemNameData[0].id).toEqual('test-item');
      done();
    });
  });
});
