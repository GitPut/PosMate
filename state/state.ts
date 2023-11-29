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
  apiUrl: "",
  ck: "",
  cs: "",
  useWoocommerce: false,
});

export const setWoocommerceState = (val) => {
  woocommerceState.set(val);
};

export const storeDetailState = entity({
  name: "",
  address: "",
  phoneNumber: "",
  website: "",
  comSelected: "",
  deliveryPrice: "",
  settingsPassword: "",
  taxRate: "",
});

export const setStoreDetailState = (val) => {
  storeDetailState.set(val);
};

export const trialDetailsState = entity({
  endDate: null,
  hasEnded: null,
});

export const setTrialDetailsState = (val) => {
  trialDetailsState.set(val);
};

export const tutorialDetailsState = entity({
  complete: null,
  step: null,
});

export const setTutorialDetailsState = (val) => {
  tutorialDetailsState.set(val);
};

export const isSignedInSettingsState = entity(false);

export const setIsSignedInSettingsState = (val) => {
  isSignedInSettingsState.set(val);
};

export const selectedProductState = entity({});

export const setSelectedProductState = (val) => {
  selectedProductState.set(val);
};