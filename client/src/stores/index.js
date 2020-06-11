import { configure } from "mobx";
import DrinkStore from "./DrinkStore";
import CategoryStore from "./CategoryStore";

configure({ enforceActions: `observed` });

class Store {
  constructor() {
    this.categoryStore = new CategoryStore(this);
    this.drinkStore = new DrinkStore(this);
  }

  loadAllData = async () => {
    await this.categoryStore.loadAllCategories();
    this.drinkStore.loadAllDrinks();
  };
}

export default Store;
