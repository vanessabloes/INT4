import { v4 } from "uuid";
import { decorate, observable, action, computed, configure } from "mobx";

configure({ enforceActions: `observed` });

class CategoryModel {
  constructor({ id = v4(), store, ...json }) {
    this.id = id;
    this.drinks = [];

    if (!store) {
      throw new Error("store is required");
    }

    this.store = store;
    this.updateFromJson(json);
    this.store.addCategory(this);
  }

  setName = value => (this.name = value);

  create = async () => this.store.createCategory(this.asJson);
  update = async () => this.store.updateCategory(this.asJson);
  delete = async () => await this.store.deleteCategory(this.asJson);

  updateFromJson = ({ name }) => {
    this.setName(name);
  };

  linkDrink(drink) {
    !this.drinks.includes(drink) && this.drinks.push(drink);
  }

  unlinkDrink(drink) {
    const index = this.drinks.findIndex(test => test.id === drink.id);
    if (index !== -1) {
      this.drinks.splice(index, 1);
    }
  }

  get asJson() {
    return {
      id: this.id,
      name: this.name
    };
  }
}

decorate(CategoryModel, {
  name: observable,
  drinks: observable,
  setName: action,
  updateFromJson: action,
  asJson: computed,
  unlinkDrink: action
});

export default CategoryModel;
