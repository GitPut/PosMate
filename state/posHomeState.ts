import { entity } from "simpler-state";
import { AddressType, CustomerProp, OngoingListStateProp } from "types/global";

interface PosHomeState {
  section: string;
  deliveryModal: boolean;
  cashModal: boolean;
  ongoingDelivery: boolean;
  name: string;
  phone: string;
  address?: AddressType | null;
  buzzCode?: string | null;
  unitNumber?: string | null;
  deliveryChecked: boolean | null;
  changeDue: string;
  cartSub: number;
  saveCustomerModal: boolean;
  savedCustomerDetails: CustomerProp | null;
  ongoingOrderListModal: boolean;
  settingsPasswordModalVis: boolean;
  updatingOrder: OngoingListStateProp | null;
  ongoingListState: OngoingListStateProp[];
  clockinModal: boolean;
  discountModal: boolean;
  discountAmount: string | null;
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
  ongoingDelivery: false,
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
  updatingOrder: null,
  ongoingListState: [],
  clockinModal: false,
  discountModal: false,
  discountAmount: null,
  cartNote: "",
  customCashModal: false,
  authPasswordModal: false,
  managerAuthorizedStatus: false,
  pendingAuthAction: "",
});

export const setPosHomeState = (val: PosHomeState): void => {
  posHomeState.set(val);
};

export const resetPosHomeState = (): void => {
  posHomeState.set({
    ...posHomeState.get(),
    deliveryModal: false,
    cashModal: false,
    ongoingDelivery: false,
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
    updatingOrder: null,
    clockinModal: false,
    discountModal: false,
    discountAmount: null,
    cartNote: "",
    customCashModal: false,
    authPasswordModal: false,
    managerAuthorizedStatus: false,
    pendingAuthAction: "",
  });
};

export const updatePosHomeState = (val: Partial<PosHomeState>): void => {
  posHomeState.set({ ...posHomeState.get(), ...val });
};
