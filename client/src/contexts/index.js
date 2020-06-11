import { createContext } from "react";
import Store from "../stores";

const store = new Store();
store.loadAllData();
export const storeContext = createContext(store);
