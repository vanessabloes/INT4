import React from "react";
import styles from "./OpeningScreen.module.css"
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow"

const OpeningScreen = () => {
  return (
    <>
      <div >
        <h1 className={styles.title}>Clandestine</h1>
        <p className={styles.subtitle}>Experience travelling with your family as never before</p>
      </div>
        {/* <img src="assets/img/BOOT/boot1.svg"/> */}
        <TheePotFlow/>
    </> 
  );
};

export default OpeningScreen;


