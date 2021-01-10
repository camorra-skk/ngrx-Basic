/* NgRx */
import { createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import { Product } from '../product';

import * as ProductActions from './producer.actions';
import * as AppState from './../../state/app.state';

export interface State extends AppState.State {
  products : ProductState
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  // error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  // error: ''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const showProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProduct, (state):ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
      // showProductCode: state.showProductCode = false,
    };
  }),
  on(ProductActions.setCurrentProduct,(state,action):ProductState=> {
    return {
      ...state,
      currentProduct : action.product
    }
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    };
  })
);

