import React from "react";
import styles from "./OpeningSurrealWorld.module.css"
import PageTitle from "../PageTitle/PageTitle"
import TheePotFlow from "../buttons/Algemeen/TheePotFlow"
import {STATES} from "../../consts/index"
import { useStore } from "../../hooks";

const OpeningSurrealWorld = () => {

  const { launchFlowStore } = useStore()

  return (
    <div className={styles.opening_screen_wrapper}>
      <div className={styles.title_wrapper}>
        <PageTitle title={"A Surreal world"} subtext={"Where everyone challenges you to tell and achieve things you've never done before"}/>
        <p className={styles.subtitle}>And uncover as clan</p> 
      </div>
      <img className={styles.image} src="assets/img/LAUNCH/WORLD/worldFROG.svg"alt="nog een gele wolk"/>
      <div  className={styles.button}>
        <TheePotFlow text={"Next"} onClick={e => launchFlowStore.setHomeStrate(STATES.HOME_STATE_HOME)}/>
      </div>

    </div>
  );
};

export default OpeningSurrealWorld;