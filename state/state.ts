import { entity } from "simpler-state";

export const userState = entity(null);

export const setUserState = (val) => {
  userState.set(val);
};

export const cartState = entity([]);

export const setCartState = (val) => {
  cartState.set(val);
};

export const addCartState = (val) => {
  cartState.set((prevState) => [...prevState, val]);
};

export const userStoreState = entity({ products: [], categories: [] });

export const setUserStoreState = (val) => {
  userStoreState.set(val);
};

export const transListState = entity([]);

export const setTransListState = (val) => {
  transListState.set(val);
};

export const woocommerceState = entity({
  apiUrl: null,
  ck: null,
  cs: null,
  useWoocommerce: false,
});

export const setWoocommerceState = (val) => {
  woocommerceState.set(val);
};
