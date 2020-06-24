import React from "react";
import styles from "./OpeningFamily.module.css"
import PageTitle from "../PageTitle/PageTitle"
import TheePotFlow from "../buttons/Algemeen/TheePotFlow"
import { STATES } from "../../consts/index"
import { useStore } from "../../hooks";

const SurrealWorld = () => {

  const { launchFlowStore } = useStore();

  const handleClick = () => {
    launchFlowStore.setHomeStrate(STATES.HOME_STATE_SURREAL_WORLD);
  }

  return (
    <div className={styles.opening_screen_wrapper}>
      <div className={styles.title_wrapper}>
        <PageTitle title={"Your fam becomes your clan"} subtext={"And explore together as a family clan a yet to be discovered world during this boardgame"} />
        <p className={styles.subtitle}>Enter a world where</p>
      </div>

      <img className={styles.image_sun} src="assets/img/LAUNCH/CLAN/clanSUN.svg" alt="een zon" />
      <img className={styles.image_maskOne} src="assets/img/LAUNCH/CLAN/mask1.svg" alt="een maser van de familie met vijf ogen" />
      <img className={styles.image_maskTwo} src="assets/img/LAUNCH/CLAN/mask2.svg" alt="een maser van de familie met zes ogen" />
      <img className={styles.image_maskThree} src="assets/img/LAUNCH/CLAN/mask3.svg" alt="een maser van de familie met twee ogen" />
      <img className={styles.image_maskFour} src="assets/img/LAUNCH/CLAN/mask4.svg" alt="een maser van de familie met twee ogen" />

      <div className={styles.button}>
        <TheePotFlow text={"Next"} onClick={(e) => handleClick()} />
      </div>
    </div>
  );
};

export default SurrealWorld;


