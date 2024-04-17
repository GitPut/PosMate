import { entity } from "simpler-state";

interface PosHomeState {
  section: string;
  deliveryModal: boolean;
  cashModal: boolean;
  ongoingDelivery: any;
  name: string;
  phone: string;
  address: any;
  buzzCode: string;
  unitNumber: string;
  deliveryChecked: boolean;
  changeDue: string;
  cartSub: number;
  saveCustomerModal: boolean;
  savedCustomerDetails: any;
  ongoingOrderListModal: boolean;
  settingsPasswordModalVis: boolean;
  updatingOrder: any;
  ongoingListState: any[];
  clockinModal: boolean;
  discountModal: boolean;
  discountAmount: any;
  cartNote: string;
  customCashModal: boolean;
  authPasswordModal: boolean;
  managerAuthorizedStatus: boolean;
  pendingAuthAction: string;
}

export const posHomeState = entity<PosHomeState>({
  section: "",
  deliveryModal: false,
  cashModal: false,
  ongoingDelivery: null,
  name: "",
  phone: "",
  address: null,
  buzzCode: "",
  unitNumber: "",
  deliveryChecked: false,
  changeDue: "",
  cartSub: 0,
  saveCustomerModal: false,
  savedCustomerDetails: null,
  ongoingOrderListModal: false,
  settingsPasswordModalVis: false,
  updatingOrder: false,
  ongoingListState: [],
  clockinModal: false,
  discountModal: false,
  discountAmount: null,
  cartNote: '',
  customCashModal: false,
  authPasswordModal: false,
  managerAuthorizedStatus: false,
  pendingAuthAction: ""
});

export const setPosHomeState = (val: PosHomeState): void => {
  posHomeState.set(val);
};

export const resetPosHomeState = (): void => {
  posHomeState.set({
    ...posHomeState.get(),
    deliveryModal: false,
    cashModal: false,
    ongoingDelivery: null,
    name: "",
    phone: "",
    address: null,
    buzzCode: "",
    unitNumber: "",
    deliveryChecked: false,
    changeDue: "",
    cartSub: 0,
    saveCustomerModal: false,
    savedCustomerDetails: null,
    ongoingOrderListModal: false,
    settingsPasswordModalVis: false,
    updatingOrder: false,
    clockinModal: false,
    discountModal: false,
    discountAmount: null,
    cartNote: null,
    customCashModal: false,
    authPasswordModal: false,
    managerAuthorizedStatus: false,
    pendingAuthAction: ""
  });
};

export const updatePosHomeState = (val: Partial<PosHomeState>): void => {
  posHomeState.set({ ...posHomeState.get(), ...val });
};
