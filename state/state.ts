import { entity } from "simpler-state";

export const userState = entity<null>(null);

export const setUserState = (val: any): void => {
  userState.set(val);
};

export const cartState = entity<any[]>([]);

export const setCartState = (val: any[]): void => {
  cartState.set(val);
};

export const addCartState = (val: any, currentState: any[]): void => {
  const doesExist = currentState.findIndex(
    (item: any) =>
      item.name === val.name &&
      JSON.stringify(item.options) === JSON.stringify(val.options)
  );

  if (doesExist !== -1) {
    const newState = currentState.map((item: any) => {
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
    cartState.set((prevState: any[]) => [...prevState, val]);
  }
};

export const userStoreState = entity<{ products: any[]; categories: any[] }>({
  products: [],
  categories: [],
});

export const setUserStoreState = (val: any): void => {
  // console.log("Setting user store state: ", val);
  userStoreState.set(val);
};

export const transListState = entity<any[]>([]);

export const setTransListState = (val: any[]): void => {
  transListState.set(val);
};

export const woocommerceState = entity<{
  apiUrl: string;
  ck: string;
  cs: string;
  useWoocommerce: boolean;
}>({
  apiUrl: "",
  ck: "",
  cs: "",
  useWoocommerce: false,
});

export const setWoocommerceState = (val: any): void => {
  woocommerceState.set(val);
};

export const storeDetailState = entity<{
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  comSelected: string;
  deliveryPrice: string;
  settingsPassword: string;
  taxRate: string;
  acceptDelivery: boolean;
  deliveryRange: string;
}>({
  name: "",
  address: "",
  phoneNumber: "",
  website: "",
  comSelected: "",
  deliveryPrice: "",
  settingsPassword: "",
  taxRate: "",
  acceptDelivery: false,
  deliveryRange: "",
});

export const setStoreDetailState = (val: any): void => {
  storeDetailState.set(val);
};

export const trialDetailsState = entity<{ endDate: null; hasEnded: null }>({
  endDate: null,
  hasEnded: null,
});

export const setTrialDetailsState = (val: any): void => {
  trialDetailsState.set(val);
};

export const tutorialDetailsState = entity<{ complete: null; step: null }>({
  complete: null,
  step: null,
});

export const setTutorialDetailsState = (val: any): void => {
  tutorialDetailsState.set(val);
};

export const isSignedInSettingsState = entity<boolean>(false);

export const setIsSignedInSettingsState = (val: boolean): void => {
  isSignedInSettingsState.set(val);
};

export const selectedProductState = entity<any>({});

export const setSelectedProductState = (val: any): void => {
  selectedProductState.set(val);
};

export const customersList = entity<any[]>([]);

export const setCustomersList = (val: any[]): void => {
  customersList.set(val);
};

export const myDeviceDetailsState = entity<{
  name: null;
  id: null;
  docID: null;
  useDifferentDeviceToPrint: boolean;
  printToPrinter: null;
  sendPrintToUserID: null;
  printOnlineOrders: boolean;
}>({
  name: null,
  id: null,
  docID: null,
  useDifferentDeviceToPrint: false,
  printToPrinter: null,
  sendPrintToUserID: null,
  printOnlineOrders: false,
});

export const setMyDeviceDetailsState = (val: any): void => {
  myDeviceDetailsState.set(val);
};

export const employeesState = entity<any[]>([]);

export const setEmployeesState = (val: any[]): void => {
  employeesState.set(val);
};

export const onlineStoreState = entity<{
  onlineStoreActive: boolean;
  onlineStoreSetUp: boolean;
  urlEnding: null;
  stripePublicKey: null;
  stripeSecretKey: null;
  paidStatus: null;
}>({
  onlineStoreActive: false,
  onlineStoreSetUp: false,
  urlEnding: null,
  stripePublicKey: null,
  stripeSecretKey: null,
  paidStatus: null,
});

export const setOnlineStoreState = (val: any): void => {
  onlineStoreState.set(val);
};

export const deviceIdState = entity<null>(null);

export const setDeviceIdState = (val: any): void => {
  deviceIdState.set(val);
};

export const deviceTreeState = entity<{
  extraDevicesPayingFor: number;
  devices: any[];
}>({
  extraDevicesPayingFor: 0,
  devices: [],
});

export const setDeviceTreeState = (val: any): void => {
  deviceTreeState.set(val);
};
