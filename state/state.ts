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
      JSON.stringify(item.options) === JSON.stringify(val.options) &&
      item.extraDetails === val.extraDetails
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

export const updateUserStoreState = (val: any): void => {
  userStoreState.set((prevState: any) => ({
    ...prevState,
    ...val,
  }));
}

export const setUserStoreState = (val: any): void => {
  // console.log("Setting user store state: ", val);
  userStoreState.set(val);
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

interface Customer {
  name: string;
  phone: string;
  address: string | null;
  buzzCode: string | null;
  unitNumber: string | null;
  orders: any[];
  id: string;
}

export const customersList = entity<Customer[]>([]);

export const setCustomersList = (val: Customer[]): void => {
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

export const resetMyDeviceDetailsState = (): void => {
  myDeviceDetailsState.set({
    name: null,
    id: null,
    docID: null,
    useDifferentDeviceToPrint: false,
    printToPrinter: null,
    sendPrintToUserID: null,
    printOnlineOrders: false,
  });
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

export const transListState = entity<any[]>([]);

export const setTransListState = (val: any[]): void => {
  transListState.set(val);
};

export const transListTableOrgState = entity<any[]>([]);

export const setTransListTableOrgState = (val: any[]): void => {
  transListTableOrgState.set(val);
};

interface ProductBuilderStateProps {
  product: object | null;
  itemIndex?: number | null;
  imageUrl?: string;
  isOnlineOrder: boolean;
  isOpen: boolean;
}

export const ProductBuilderState = entity<ProductBuilderStateProps>({
  product: null,
  itemIndex: null,
  imageUrl: "",
  isOnlineOrder: false,
  isOpen: false,
});

export const setProductBuilderState = (val: ProductBuilderStateProps): void => {
  const productBuilderState = ProductBuilderState.get();
  ProductBuilderState.set({ ...productBuilderState, ...val });
};

export const resetProductBuilderState = (): void => {
  const productBuilderState = ProductBuilderState.get();
  ProductBuilderState.set({
    ...productBuilderState,
    isOpen: false,
  });
  setTimeout(() => {
    ProductBuilderState.set({
      product: null,
      itemIndex: null,
      imageUrl: "",
      isOnlineOrder: productBuilderState.isOnlineOrder,
      isOpen: false,
    });
  }, 200);
};

interface OrderDetailsStateProps {
  date: Date | null;
  transNum: string | null;
  total: string | null;
  method: "deliveryOrder" | "pickupOrder" | null;
  online: boolean;
  delivery: any | null;
  address: any | null;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: any | null;
    buzzCode?: string;
    unitNumber?: string;
  };
  cart: any[];
  page: number;
}

export const OrderDetailsState = entity<OrderDetailsStateProps>({
  date: null,
  transNum: null,
  total: null,
  method: null,
  online: true,
  delivery: null,
  address: null,
  customer: {
    name: "",
    phone: "",
    email: "",
    address: null,
    buzzCode: "",
    unitNumber: "",
  },
  cart: [],
  page: 1,
});

export const setOrderDetailsState = (
  val: Partial<OrderDetailsStateProps>
): void => {
  OrderDetailsState.set({
    ...OrderDetailsState.get(),
    ...val,
    customer: { ...OrderDetailsState.get().customer, ...val.customer },
  });
};
