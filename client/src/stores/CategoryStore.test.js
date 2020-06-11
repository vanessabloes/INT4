import RootStore from ".";
import CategoryStore from "./CategoryStore";
import CategoryModel from "../models/CategoryModel";

test("Create a new CategoryStore", () => {
  const store = new CategoryStore();
  expect(store.categories).toBeInstanceOf(Array);
  expect(store.categories.length).toBe(0);
});

test("updateCategoryFromServer creates a new category when json is passed in", () => {
  const store = new RootStore();
  store.categoryStore.updateCategoryFromServer({
    name: "testCategory"
  });
  const category = store.categoryStore.categories[0];
  expect(category).toBeInstanceOf(CategoryModel);
  expect(category.name).toBe("testCategory");
});

test("updateCategoryFromServer updates an existing category", () => {
  const store = new RootStore();
  store.categoryStore.updateCategoryFromServer({
    name: "testCategory"
  });
  const category = store.categoryStore.categories[0];
  store.categoryStore.updateCategoryFromServer({
    id: category.id,
    name: "updated testCategory"
  });
  expect(category.name).toBe("updated testCategory");
});

test("updateCategoryFromServer deleted an category", () => {
  const store = new RootStore();
  store.categoryStore.updateCategoryFromServer({
    name: "testCategory"
  });
  expect(store.categoryStore.categories.length).toBe(1);
  const category = store.categoryStore.categories[0];
  store.categoryStore.updateCategoryFromServer({
    id: category.id,
    isDeleted: true
  });
  expect(store.categoryStore.categories.length).toBe(0);
});
