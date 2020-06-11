import React from "react";

import styles from "./PriceList.module.css";
import { useStore } from "../../hooks";

import { useObserver } from "mobx-react-lite";
import CategoryModel from "../../models/CategoryModel";
import Category from "../Category/Category";

const PriceList = () => {
  const { categoryStore } = useStore();

  const addCategory = () => {
    const cat = new CategoryModel({ store: categoryStore, name: "new" });
    cat.create();
  };

  return useObserver(() => (
    <div className={styles.priceList}>
      {categoryStore.loading ? (
        <p>Loading</p>
      ) : (
        categoryStore.categories.map(category => (
          <Category key={category.id} category={category} />
        ))
      )}
      <button className={styles.add} onClick={addCategory}>
        +
      </button>
    </div>
  ));
};

export default PriceList;
