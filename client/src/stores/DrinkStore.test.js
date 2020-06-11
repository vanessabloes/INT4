import RootStore from ".";
import DrinkStore from "./DrinkStore";
import DrinkModel from "../models/DrinkModel";
import CategoryModel from "../models/CategoryModel";

test("Create a new AuhtorStore", () => {
  const store = new DrinkStore();
  expect(store.drinks).toBeInstanceOf(Array);
  expect(store.drinks.length).toBe(0);
});

test("Resolve a drink", () => {
  const store = new RootStore();
  const category = new CategoryModel({
    name: "testDrink",
    store: store.categoryStore
  });
  const drink = new DrinkModel({
    name: "testdrink",
    store: store.drinkStore,
    categoryId: category.id
  });
  expect(store.drinkStore.resolveDrink(drink.id)).toBe(drink);
});

test("updateDrinkFromServer creates a new drink when json is passed in", () => {
  const store = new RootStore();
  const category = new CategoryModel({
    name: "testDrink",
    store: store.categoryStore
  });
  store.drinkStore.updateDrinkFromServer({
    name: "testDrink",
    categoryId: category.id
  });
  const drink = store.drinkStore.drinks[0];
  expect(drink).toBeInstanceOf(DrinkModel);
  expect(drink.name).toBe("testDrink");
});

test("updateDrinkFromServer updates an existing drink", () => {
  const store = new RootStore();
  const category = new CategoryModel({
    name: "testDrink",
    store: store.categoryStore
  });
  store.drinkStore.updateDrinkFromServer({
    name: "testDrink",
    categoryId: category.id
  });
  const drink = store.drinkStore.drinks[0];
  store.drinkStore.updateDrinkFromServer({
    id: drink.id,
    name: "updated testDrink",
    categoryId: category.id
  });
  expect(drink.name).toBe("updated testDrink");
});

test("updateDrinkFromServer deleted an drink", () => {
  const store = new RootStore();
  const category = new CategoryModel({
    name: "testDrink",
    store: store.categoryStore
  });
  store.drinkStore.updateDrinkFromServer({
    name: "testDrink",
    categoryId: category.id
  });
  expect(store.drinkStore.drinks.length).toBe(1);
  const drink = store.drinkStore.drinks[0];
  store.drinkStore.updateDrinkFromServer({
    id: drink.id,
    isDeleted: true
  });
  expect(store.drinkStore.drinks.length).toBe(0);
});
