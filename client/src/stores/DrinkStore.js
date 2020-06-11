import { decorate, observable, action } from "mobx";
import DrinkModel from "../models/DrinkModel.js";
import RestService from "../services/RestService";

class DrinkStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.drinks = [];
    this.drinksService = new RestService(`drinks`);
  }

  loadAllDrinks = async () => {
    const jsonDrinks = await this.drinksService.getAll();
    jsonDrinks.forEach(json => this.updateDrinkFromServer(json));
  };

  addDrink = drink => {
    this.drinks.push(drink);
  };

  createDrink = async drink => {
    const json = await this.drinksService.create(drink);
    this.updateDrinkFromServer(json);
  };

  updateDrink = async drink => {
    const json = await this.drinksService.update(drink);
    this.updateDrinkFromServer(json);
  };

  deleteDrink = async drink => {
    const json = await this.drinksService.delete(drink);
    this.updateDrinkFromServer(json);
  };

  updateDrinkFromServer(json) {
    let drink = this.drinks.find(drink => drink.id === json.id);
    if (!drink) {
      drink = new DrinkModel({
        id: json.id,
        store: this.rootStore.drinkStore,
        categoryId: json.categoryId
      });
    }
    if (json.isDeleted) {
      this.drinks.remove(drink);
    } else {
      drink.updateFromJson(json);
    }
  }

  resolveDrink = id => this.drinks.find(drink => drink.id === id);
}

decorate(DrinkStore, {
  drinks: observable,
  addDrink: action,
  updateDrinkFromServer: action
});

export default DrinkStore;
