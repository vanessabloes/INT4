import { v4 } from "uuid";
import { decorate, observable, action, computed, configure } from "mobx";

configure({ enforceActions: `observed` });

class DrinkModel {
  constructor({ id = v4(), store, ...json }) {
    this.id = id;

    if (!store) {
      throw new Error("store is required");
    }

    this.store = store;
    this.updateFromJson(json);
    this.store.addDrink(this);
  }

  setName = value => (this.name = value);
  setPrice = value => (this.price = value);

  create = async () => this.store.createDrink(this.asJson);
  update = async () => this.store.updateDrink(this.asJson);
  delete = async () => {
    await this.store.deleteDrink(this.asJson);
    this.category.unlinkDrink(this);
  };

  setCategory(category) {
    if (this.category) {
      this.category.unlinkDrink(this);
    }
    if (category) {
      this.categoryId = category.id;
      this.category.linkDrink(this);
    } else {
      this.categoryId = null;
    }
  }

  updateFromJson = ({ name, price, categoryId }) => {
    if (!categoryId) {
      throw new Error("categoryId is required");
    }
    this.setName(name);
    this.setPrice(price);

    this.setCategory(
      this.store.rootStore.categoryStore.resolveCategory(categoryId)
    );
  };

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      categoryId: this.category ? this.category.id : null
    };
  }

  get category() {
    return this.store.rootStore.categoryStore.resolveCategory(this.categoryId);
  }
}

decorate(DrinkModel, {
  name: observable,
  price: observable,
  setName: action,
  setPrice: action,
  updateFromJson: action,
  asJson: computed
});

export default DrinkModel;
