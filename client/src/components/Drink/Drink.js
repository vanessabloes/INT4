import React, { useState } from "react";
import EditDrink from "../EditDrink/EditDrink";
import { useObserver } from "mobx-react-lite";

import style from "./Drink.module.css";

const Drink = ({ drink }) => {
  const [edit, setEdit] = useState(false);

  return useObserver(() => (
    <li className={style.item}>
      {edit ? (
        <EditDrink drink={drink} onDone={() => setEdit(false)} />
      ) : (
        <button className={style.noButton} onClick={() => setEdit(true)}>
          <div className={style.drink}>
            <span className={style.name}>{drink.name}</span>
            <span className={style.price}>{drink.price}</span>
          </div>
        </button>
      )}
    </li>
  ));
};

export default Drink;
