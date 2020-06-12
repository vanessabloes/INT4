import { configure } from "mobx";


configure({ enforceActions: `observed` });

class Store {
  constructor() {
    //this.categoryStore = new CategoryStore(this);
    //this.drinkStore = new DrinkStore(this);
  }

  loadAllData = async () => {
    //await this.categoryStore.loadAllCategories();
    //this.drinkStore.loadAllDrinks();
  };
}

export default Store;
