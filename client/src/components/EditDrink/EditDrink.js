import React from "react";
import styles from "./EditDrink.module.css";
import form from "../../styles/form.module.css";
import { useObserver } from "mobx-react-lite";

const EditDrink = ({ drink, onDone }) => {
  const handleSubmit = e => {
    e.preventDefault();
    drink.update();
    onDone();
  };

  const onCancel = () => onDone();

  const onDelete = () => drink.delete();

  return useObserver(() => (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        className={form.name}
        value={drink.name}
        onChange={e => drink.setName(e.target.value)}
      />
      <input
        type="number"
        className={form.price}
        value={drink.price}
        step="0.5"
        onChange={e => drink.setPrice(e.target.value)}
      />
      <input className={form.save} type="submit" value="Save" />
      <button className={form.cancel} type="button" onClick={onCancel}>
        Cancel
      </button>
      <button className={form.delete} type="button" onClick={onDelete}>
        Delete
      </button>
    </form>
  ));
};

export default EditDrink;
