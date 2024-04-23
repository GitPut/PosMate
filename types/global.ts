export type AddressType = {
  label?: string;
  value?: {
    description: string;
    matched_substrings: [
      {
        length: number;
        offset: number;
      },
      {
        length: number;
        offset: number;
      }
    ];
    place_id?: string;
    reference?: string;
    structured_formatting?: {
      main_text: string;
      secondary_text: string;
    };
  };
};

export type SelectedCaseListItem = {
  selectedCaseKey: string | null;
  selectedCaseValue: string | null;
  id?: string;
};

export type ProductProp = {
  name: string;
  price: string;
  description: string;
  options: Option[] | [];
  total?: string;
  extraDetails?: string;
  calorieDetails?: string;
  id: string;
  imageUrl?: string | null;
  hasImage?: boolean;
  category?: string | null;
  rank?: string;
  dontDisplayOnOnlineStore?: boolean;
  isTemplate?: boolean;
  index?: number;
};

export type Option = {
  label: string | null;
  optionType: string | null;
  optionsList: OptionsList[];
  isRequired?: boolean;
  selectedCaseList?: SelectedCaseListItem[] | [];
  defaultValue?: OptionsList;
  selected?: boolean;
  selectedTimes?: string;
  numOfSelectable?: string | null;
  id?: string;
};

export type OptionsList = {
  label: string | null;
  selected?: boolean;
  selectedTimes?: string;
  countsAs?: string;
  id: string;
  priceIncrease?: string | null;
};

export type CartItemProp = {
  name: string;
  price: string;
  description: string | null;
  options: string[];
  extraDetails: string | null;
  editableObj?: EditableProductObj;
  imageUrl?: string | null;
  quantityNotChangable?: boolean;
  percent?: string;
  quantity?: string;
};

export type EditableProductObj = {
  name: string;
  price: string;
  description: string;
  options: Option[];
  calorieDetails?: string;
  total: string;
  extraDetails: string;
  id: string;
};

export type MyDeviceDetailsProps = {
  name: string | null;
  id: string | null;
  docID: string | null;
  useDifferentDeviceToPrint: boolean | null;
  printToPrinter: string | null;
  sendPrintToUserID: {
    label: string;
    value: string;
  } | null;
  printOnlineOrders: boolean | null;
};

export type StoreDetailsProps = {
  name: string;
  address?: AddressType | null;
  phoneNumber: string;
  website: string;
  deliveryPrice: string;
  settingsPassword: string;
  taxRate: string;
  acceptDelivery: boolean;
  deliveryRange: string;
  onlineStoreActive?: boolean;
  hasLogo?: boolean;
  logoUrl?: string;
  stripePublicKey?: string;
  stripeSecretKey?: string;
  hasSocial?: boolean;
};

export type CustomerProp = {
  name: string;
  phone: string;
  address?: AddressType | null;
  buzzCode?: string | null;
  unitNumber?: string | null;
  orders: CustomersOrdersProp[];
  id: string;
  createdAt?: { seconds: number };
};

export type CustomersOrdersProp = {
  cart: CartItemProp[];
};

export type OngoingListStateProp = {
  id: string;
  cart: CartItemProp[];
  cartNote: string;
  customer: {
    name: string;
    phone: string;
    address?: AddressType | null;
  } | null;
  date: { seconds: number | string } | Date | string;
  method: string;
  online: boolean;
  isInStoreOrder: boolean;
  transNum: string;
  total: string;
  index?: string | null;
  date_created?: string;
  dateCompleted?: { seconds: number | string } | Date | string;
};

export type Employee = {
  name: string;
  pin: string;
  id: string;
  clockedIn?: {
    startTime: string;
    date: Date;
  };
  role?: string;
};

export type Device = {
  name: string;
  id: string | null;
  printOnlineOrders: boolean;
  useDifferentDeviceToPrint: boolean;
  printToPrinter: string | null;
  sendPrintToUserID: {
    label: string;
    value: string;
  } | null;
  docID: string;
};

export type TransListStateItem = {
  id: string;
  name?: string;
  date: { seconds: number | string } | Date | string;
  amount?: string;
  system?: string;
  method?: string;
  type?: string;
  docID?: string;
  customer?: {
    name: string;
    phone: string;
    address?: AddressType | null;
    unitNumber?: string | null;
    buzzCode?: string | null;
  };
  total?: string;
  originalData?: OngoingListStateProp;
  cart?: CartItemProp[];
  cartNote?: string;
  paymentMethod?: string;
  online?: boolean;
  transNum?: string;
  changeDue?: string;
  date_created?: string;
  isInStoreOrder?: boolean;
};

export type HourItem = {
  date: Date;
  startTime: string;
  endTime: string;
  id: string;
  paid: boolean;
};

export type UserStoreStateProps = {
  products: ProductProp[];
  categories: string[];
  //this is for online store ordering only
  docID?: string;
};

export type CurrentOrderProp = {
  element: TransListStateItem | null;
  index?: string | null;
  type?: string | null;
  cartString?: string | null;
  date: { seconds: number } | Date | string | null;
  cart?: CartItemProp[];
  cartNote?: string | null;
  isInStoreOrder?: boolean | null;
  id?: string;
  customer?: CustomerProp | null;
  method?: string | null;
};
