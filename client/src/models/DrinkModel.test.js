import DrinkModel from "./DrinkModel";
import CategoryModel from "./CategoryModel";
import RootStore from "../stores";

test("Create a new drink", () => {
  const rootStore = new RootStore();
  const drink = new DrinkModel({
    name: "Test",
    price: 10,
    store: rootStore.drinkStore,
    categoryId: 1
  });
  expect(drink.name).toBe("Test");
  expect(drink.price).toBe(10);
  expect(drink.store).not.toBeUndefined();
  expect(drink.category).toBeUndefined();
});

test("Link an category with a drink when providing in the constructor", () => {
  const rootStore = new RootStore();
  const category = new CategoryModel({
    name: "TestCategory",
    store: rootStore.categoryStore
  });
  const drink = new DrinkModel({
    name: "Test",
    store: rootStore.drinkStore,
    categoryId: category.id
  });
  expect(drink.category).toBe(category);
  expect(category.drinks.length).toBe(1);
  expect(category.drinks[0]).toBe(drink);
});

test("Store is required", () => {
  expect(() => new DrinkModel({ name: "Test" })).toThrow("store is required");
});

test("CategoryId is required", () => {
  const rootStore = new RootStore();
  expect(
    () => new DrinkModel({ name: "Test", store: rootStore.drinkStore })
  ).toThrow("categoryId is required");
});

test("Set an category for a drink", () => {
  const rootStore = new RootStore();
  const category = new CategoryModel({
    name: "testcategory",
    store: rootStore.categoryStore
  });
  const drink = new DrinkModel({
    name: "testdrink",
    store: rootStore.drinkStore,
    categoryId: category.id
  });
  drink.setCategory(category);
  expect(drink.category).toBe(category);
  expect(category.drinks).toContain(drink);
});

test("Providing no category to setCategory should unlink the category from a drink", () => {
  const rootStore = new RootStore();
  const category = new CategoryModel({
    name: "testcategory",
    store: rootStore.categoryStore
  });
  const drink = new DrinkModel({
    name: "testdrink",
    store: rootStore.drinkStore,
    categoryId: category.id
  });
  expect(drink.category).toStrictEqual(category);
  expect(category.drinks[0]).toStrictEqual(drink);
  drink.setCategory();
  expect(drink.category).toBeUndefined();
  expect(category.drinks.length).toBe(0);
});

test("Changing an category for a drink must change the category", () => {
  const rootStore = new RootStore();
  const category1 = new CategoryModel({
    name: "category1",
    store: rootStore.categoryStore
  });
  const category2 = new CategoryModel({
    name: "category2",
    store: rootStore.categoryStore
  });
  const drink = new DrinkModel({
    name: "testdrink",
    store: rootStore.drinkStore,
    categoryId: category1.id
  });
  expect(drink.category).toStrictEqual(category1);
  expect(category1.drinks[0]).toStrictEqual(drink);
  expect(category2.drinks.length).toBe(0);

  drink.setCategory(category2);
  expect(drink.category).toStrictEqual(category2);
  expect(category2.drinks[0]).toStrictEqual(drink);
  expect(category1.drinks.length).toBe(0);
});

test("Store must have a reference to a created drink", () => {
  const rootStore = new RootStore();
  expect(rootStore.drinkStore.drinks.length).toBe(0);
  const category = new CategoryModel({
    name: "testcategory",
    store: rootStore.categoryStore
  });
  const drink = new DrinkModel({
    name: "testdrink",
    store: rootStore.drinkStore,
    categoryId: category.id
  });
  expect(rootStore.drinkStore.drinks.length).toBe(1);
  expect(rootStore.drinkStore.drinks[0]).toStrictEqual(drink);
});

test("updateFromJson sets the correct properties of the DrinkModel", () => {
  const store = new RootStore();
  const drink = new DrinkModel({
    name: "Test",
    price: 10,
    categoryId: 1,
    store: store.drinkStore
  });
  drink.updateFromJson({
    categoryId: 1,
    name: "updated name",
    price: 20
  });
  expect(drink.name).toBe("updated name");
  expect(drink.price).toBe(20);
});

test("asJson returns an object with the basic properties", () => {
  const rootStore = new RootStore();
  const category = new CategoryModel({
    name: "TestCategory",
    store: rootStore.categoryStore
  });
  const drink = new DrinkModel({
    name: "Test",
    price: 10,
    store: rootStore.drinkStore,
    categoryId: category.id
  });
  expect(drink.asJson).toMatchObject({
    id: drink.id,
    name: "Test",
    price: 10,
    categoryId: category.id
  });
});
