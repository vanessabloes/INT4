import React from "react";
import styles from "./World.module.css"


const World = ({ journey }) => {

  return (
    <div className={styles.world_wrapper}>
      <h2 className={styles.world_title}>{journey.name}</h2>
      <img className={styles.world_image} src={journey.image} alt={journey.name} />
    </div>

  );
};

export default World;


