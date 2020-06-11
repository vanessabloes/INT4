import { decorate, observable, action } from "mobx";
import RestService from "../services/RestService.js";
import CategoryModel from "../models/CategoryModel.js";

class CategoryStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.categories = [];
    this.categoriesService = new RestService(`categories`);
  }

  loadAllCategories = async () => {
    const jsonCategories = await this.categoriesService.getAll();
    jsonCategories.forEach(json => this.updateCategoryFromServer(json));
  };

  addCategory = category => {
    this.categories.push(category);
  };

  createCategory = async category => {
    const json = await this.categoriesService.create(category);
    this.updateCategoryFromServer(json);
  };

  updateCategory = async category => {
    const json = await this.categoriesService.update(category);
    this.updateCategoryFromServer(json);
  };

  deleteCategory = async category => {
    const json = await this.categoriesService.delete(category);
    this.updateCategoryFromServer(json);
  };

  updateCategoryFromServer(json) {
    let category = this.categories.find(category => category.id === json.id);
    if (!category) {
      category = new CategoryModel({
        id: json.id,
        store: this.rootStore.categoryStore
      });
    }
    if (json.isDeleted) {
      this.categories.remove(category);
    } else {
      category.updateFromJson(json);
    }
  }

  resolveCategory = id => this.categories.find(category => category.id === id);
}

decorate(CategoryStore, {
  categories: observable,
  addCategory: action,
  updateCategoryFromServer: action
});

export default CategoryStore;
