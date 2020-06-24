import React from "react";
import styles from "./OpeningScreen.module.css"
import TheePotFlow from "../buttons/Algemeen/TheePotFlow"
import LoadingWheel from "../../components/LoadingWheel/index"
import { useStore } from "../../hooks";
import { STATES } from "../../consts/index"
import { useObserver } from "mobx-react-lite";


const OpeningScreen = () => {

  const { launchFlowStore, uiStore } = useStore()

  const launch = localStorage.getItem('launch_page');

  const handleClick = () => {
    launchFlowStore.setHomeStrate(STATES.HOME_STATE_FAMILY);
  }


  return useObserver(() => (
    <div className={styles.opening_screen_wrapper}>

      <div className={styles.title_wrapper}>
        <h1 className={styles.title}>Clandestine</h1>
        <p className={styles.subtitle}>Experience travelling with your family as never before</p>
      </div>


      <img className={styles.image_mask} src="assets/img/BOOT/boot1.svg" alt="clandestine mask" />
      <img className={styles.image_wolkOne} src="assets/img/BOOT/wolkje1.svg" alt="een gele wolk" />
      <img className={styles.image_wolkTwo} src="assets/img/BOOT/wolkje2.svg" alt="nog een gele wolk" />


      <div className={styles.button}>
        {uiStore.loadedAllData === true ?

          launch === "launched" ? launchFlowStore.setHomeStrate(STATES.HOME_STATE_HOME)

            : <TheePotFlow text={"Next"} onClick={e => handleClick()} />

          : <LoadingWheel />}
      </div>

    </div>





  ));
};

export default OpeningScreen;


//