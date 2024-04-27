import { entity } from "simpler-state";
import {
  AddressType,
  CartItemProp,
  CustomerProp,
  Device,
  Employee,
  MyDeviceDetailsProps,
  ProductProp,
  StoreDetailsProps,
  TransListStateItem,
  UserStoreStateProps,
} from "types/global";

export const cartState = entity<CartItemProp[]>([]);

export const setCartState = (val: CartItemProp[]): void => {
  cartState.set(val);
};

export const addCartState = (
  val: CartItemProp,
  currentState: CartItemProp[]
): void => {
  const doesExist = currentState.findIndex(
    (item: CartItemProp) =>
      item.name === val.name &&
      JSON.stringify(item.options) === JSON.stringify(val.options) &&
      item.extraDetails === val.extraDetails
  );

  if (doesExist !== -1) {
    const newState = currentState.map((item: CartItemProp) => {
      const copyItem = { ...item };
      delete copyItem.quantity;

      if (JSON.stringify(copyItem) === JSON.stringify(val)) {
        return {
          ...item,
          quantity: item.quantity ? String(item.quantity + 1) : "2",
        };
      } else {
        return item;
      }
    });
    cartState.set(newState);
  } else {
    cartState.set([...currentState, val]);
  }
};

export const userStoreState = entity<UserStoreStateProps>({
  products: [],
  categories: [],
});

export const updateUserStoreState = (val: Partial<UserStoreStateProps>) => {
  userStoreState.set({ ...userStoreState.get(), ...val });
};

export const setUserStoreState = (val: UserStoreStateProps) => {
  console.log("Val: ", val);
  userStoreState.set(val);
};

interface WoocommerceStateProps {
  apiUrl: string;
  ck: string;
  cs: string;
  useWoocommerce: boolean;
}

export const woocommerceState = entity<WoocommerceStateProps>({
  apiUrl: "",
  ck: "",
  cs: "",
  useWoocommerce: false,
});

export const setWoocommerceState = (val: WoocommerceStateProps): void => {
  woocommerceState.set(val);
};

export const storeDetailState = entity<StoreDetailsProps>({
  name: "",
  phoneNumber: "",
  website: "",
  deliveryPrice: "",
  settingsPassword: "",
  taxRate: "",
  acceptDelivery: false,
  deliveryRange: "",
});

export const setStoreDetailState = (val: StoreDetailsProps): void => {
  storeDetailState.set(val);
};

interface TrialDetailsStateProps {
  endDate: Date | null;
  hasEnded: boolean | null;
}

export const trialDetailsState = entity<TrialDetailsStateProps>({
  endDate: null,
  hasEnded: null,
});

export const setTrialDetailsState = (val: TrialDetailsStateProps): void => {
  trialDetailsState.set(val);
};

export const isSignedInSettingsState = entity<boolean>(false);

export const setIsSignedInSettingsState = (val: boolean): void => {
  isSignedInSettingsState.set(val);
};

export const customersList = entity<CustomerProp[]>([]);

export const setCustomersList = (val: CustomerProp[]): void => {
  customersList.set(val);
};

export const myDeviceDetailsState = entity<MyDeviceDetailsProps>({
  name: null,
  id: null,
  docID: null,
  useDifferentDeviceToPrint: false,
  printToPrinter: null,
  sendPrintToUserID: null,
  printOnlineOrders: false,
});

export const setMyDeviceDetailsState = (val: MyDeviceDetailsProps): void => {
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

export const employeesState = entity<Employee[]>([]);

export const setEmployeesState = (val: Employee[]): void => {
  employeesState.set(val);
};

interface OnlineStoreStateProps {
  onlineStoreActive: boolean;
  onlineStoreSetUp: boolean;
  urlEnding: string;
  stripePublicKey: string | null;
  stripeSecretKey: string | null;
  paidStatus: string | null;
}

export const onlineStoreState = entity<OnlineStoreStateProps>({
  onlineStoreActive: false,
  onlineStoreSetUp: false,
  urlEnding: "",
  stripePublicKey: "",
  stripeSecretKey: "",
  paidStatus: null,
});

export const setOnlineStoreState = (val: OnlineStoreStateProps) => {
  onlineStoreState.set(val);
};

export const deviceIdState = entity<string | null>(null);

export const setDeviceIdState = (val: string | null): void => {
  deviceIdState.set(val);
};

interface DeviceTreeProps {
  devices: Device[];
  extraDevicesPayingFor: number;
}

export const deviceTreeState = entity<DeviceTreeProps>({
  extraDevicesPayingFor: 0,
  devices: [],
});

export const setDeviceTreeState = (val: DeviceTreeProps): void => {
  deviceTreeState.set(val);
};

export const transListState = entity<TransListStateItem[]>([]);

export const setTransListState = (val: TransListStateItem[]): void => {
  transListState.set(val);
};

export const transListTableOrgState = entity<TransListStateItem[]>([]);

export const setTransListTableOrgState = (val: TransListStateItem[]): void => {
  transListTableOrgState.set(val);
};

interface ProductBuilderStateProps {
  product: ProductProp | null;
  itemIndex?: number | null;
  imageUrl?: string | null;
  isOnlineOrder?: boolean | null;
  isOpen: boolean | null;
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
  delivery: boolean | null;
  address?: AddressType | null;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: AddressType | null;
    buzzCode?: string;
    unitNumber?: string;
  };
  cart: CartItemProp[];
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
