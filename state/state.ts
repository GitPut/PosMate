import { entity } from "simpler-state";

export const userState = entity(null);

export const setUserState = (val) => {
  userState.set(val);
};

export const cartState = entity([]);

export const setCartState = (val) => {
  cartState.set(val);
};

export const addCartState = (val, currentState) => {
  const doesExist = currentState.findIndex(
    (item) =>
      item.name === val.name &&
      JSON.stringify(item.options) === JSON.stringify(val.options)
  );
  console.log(
    "Does exist? ",
    doesExist,
    " Cart: ",
    currentState,
    " Val: ",
    val
  );

  if (doesExist !== -1) {
    const newState = currentState.map((item) => {
      const copyItem = { ...item };
      delete copyItem.quantity;

      if (JSON.stringify(copyItem) === JSON.stringify(val)) {
        return { ...item, quantity: item.quantity ? item.quantity + 1 : 2 };
      } else {
        return item;
      }
    });
    cartState.set(newState);
  } else {
    cartState.set((prevState) => [...prevState, val]);
  }
};

export const userStoreState = entity({ products: [], categories: [] });

export const setUserStoreState = (val) => {
  // console.log("Setting user store state: ", val);
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
