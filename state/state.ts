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
