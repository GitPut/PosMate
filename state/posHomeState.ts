import { entity } from "simpler-state";

//  const [section, setsection] = useState(
//    catalog.categories.length > 0 ? catalog.categories[0] : ""
//  );
//  const [deliveryModal, setDeliveryModal] = useState(false);
//  const [cashModal, setCashModal] = useState(false);
//  const [ongoingDelivery, setOngoingDelivery] = useState(null);
//  const [name, setName] = useState("");
//  const [phone, setPhone] = useState("");
//  const [address, setAddress] = useState(null);
//  const [buzzCode, setBuzzCode] = useState("");
//  const [unitNumber, setUnitNumber] = useState("");
//  const [deliveryChecked, setDeliveryChecked] = useState(false);
//  const [changeDue, setChangeDue] = useState("");
//  const [cartSub, setCartSub] = useState(0);
//  const [saveCustomerModal, setSaveCustomerModal] = useState(false);
//  const [savedCustomerDetails, setsavedCustomerDetails] = useState(null);
//  const [ongoingOrderListModal, setongoingOrderListModal] = useState(false);
//  const [settingsPasswordModalVis, setsettingsPasswordModalVis] =
//    useState(false);
//  const [updatingOrder, setupdatingOrder] = useState(false);
//  const [ongoingListState, setongoingListState] = useState([]);
//  const [clockinModal, setclockinModal] = useState(false);
//  const [discountModal, setdiscountModal] = useState(false);
//  const [discountAmount, setDiscountAmount] = useState(null);
//  const [cartNote, setcartNote] = useState(null);

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
  updatingOrder: boolean;
  ongoingListState: any[];
  clockinModal: boolean;
  discountModal: boolean;
  discountAmount: any;
  cartNote: any;
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
  cartNote: null,
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
  });
};

export const updatePosHomeState = (val: Partial<PosHomeState>): void => {
  posHomeState.set({ ...posHomeState.get(), ...val });
};
