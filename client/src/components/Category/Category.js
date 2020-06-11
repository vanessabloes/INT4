import React, { useState } from "react";

import style from "./Category.module.css";
import form from "../../styles/form.module.css";
import { useObserver } from "mobx-react-lite";
import DrinkModel from "../../models/DrinkModel";
import { useStore } from "../../hooks";
import Drink from "../Drink/Drink";

const Category = ({ category }) => {
  const [edit, setEdit] = useState(false);
  const { drinkStore } = useStore();

  const handleSubmit = e => {
    e.preventDefault();
    category.update();
    setEdit(false);
  };

  const addDrink = () => {
    const drink = new DrinkModel({
      store: drinkStore,
      categoryId: category.id,
      name: "water",
      price: 0
    });
    drink.create();
  };

  const onCancel = () => setEdit(false);

  const onDelete = () => category.delete();

  return useObserver(() => (
    <article className={style.category}>
      {edit ? (
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            type="text"
            className={form.name}
            value={category.name}
            onChange={e => category.setName(e.target.value)}
          />
          <input type="submit" value="Save" className={form.save} />
          <button type="button" className={form.cancel} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={form.delete} onClick={onDelete}>
            Delete
          </button>
        </form>
      ) : (
        <h2 className={style.title} onClick={() => setEdit(true)}>
          {category.name}
        </h2>
      )}
      <ul>
        {category.drinks.map(drink => (
          <Drink key={drink.id} drink={drink} />
        ))}
      </ul>
      <button className={style.add} onClick={addDrink}>
        +
      </button>
    </article>
  ));
};

export default Category;
