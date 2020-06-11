import CategoryModel from "./CategoryModel";
import RootStore from "../stores";

test("Create a new category", () => {
  const rootStore = new RootStore();
  const category = new CategoryModel({
    name: "Test",
    store: rootStore.categoryStore
  });
  expect(category.name).toBe("Test");
  expect(category.store).not.toBeUndefined();
  expect(category.drinks.length).toBe(0);
});

test("Store is required", () => {
  expect(() => new CategoryModel({ name: "Test" })).toThrow(
    "store is required"
  );
});

test("Store must have a reference to a created category", () => {
  const rootStore = new RootStore();
  expect(rootStore.categoryStore.categories.length).toBe(0);
  const category = new CategoryModel({
    name: "testcategory",
    store: rootStore.categoryStore
  });
  expect(rootStore.categoryStore.categories.length).toBe(1);
  expect(rootStore.categoryStore.categories[0]).toStrictEqual(category);
});

test("updateFromJson sets the correct properties of the CategoryModel", () => {
  const store = new RootStore();
  const category = new CategoryModel({
    name: "Test",
    store: store.categoryStore
  });
  category.updateFromJson({
    name: "updated name"
  });
  expect(category.name).toBe("updated name");
});

test("asJson returns an object with the basic properties", () => {
  const store = new RootStore();
  const category = new CategoryModel({
    name: "Test",
    store: store.categoryStore
  });
  expect(category.asJson).toMatchObject({
    id: category.id,
    name: "Test"
  });
});
