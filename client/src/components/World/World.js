import React from "react";
import styles from "./World.module.css"


const World = ({world}) => {
  console.log(world)

  return (
    <div className={styles.world_wrapper}>
      <h2 className={styles.world_title}>{world.name}</h2>
      <img className={styles.world_image} src={world.image} alt={world.name} />

    </div>
    
  );
};

export default World;


