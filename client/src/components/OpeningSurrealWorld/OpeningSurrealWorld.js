import React from "react";
import styles from "./OpeningSurrealWorld.module.css"
import PageTitle from "../PageTitle/PageTitle"
import TheePotFlow from "../buttons/Algemeen/TheePotFlow"
import { STATES } from "../../consts/index"
import { useStore } from "../../hooks";
import { useEffect, useState } from "react";

const OpeningSurrealWorld = () => {

  const { launchFlowStore } = useStore()

  const [launch, setLaunch] = useState('launched')

  const handleClick = () => {
    launchFlowStore.setHomeStrate(STATES.HOME_STATE_HOME);
  }

  useEffect(() =>
    localStorage.setItem("launch_page", launch), [launch]
  );

  return (
    <div className={styles.opening_screen_wrapper}>
      <div className={styles.title_wrapper}>
        <PageTitle title={"A Surreal world"} subtext={"Where everyone challenges you to tell and achieve things you've otherwise wouldn't say or do"} />
        <p className={styles.subtitle}>Get ready to enter a</p>
      </div>
      <img className={styles.image} src="assets/img/LAUNCH/WORLD/worldFROG.svg" alt="nog een gele wolk" />
      <div className={styles.button}>
        <TheePotFlow text={"Next"} onClick={(e) => handleClick()} />
      </div>

    </div>
  );
};

export default OpeningSurrealWorld;