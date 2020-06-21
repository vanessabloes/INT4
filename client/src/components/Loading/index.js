import React from "react";
import { useObserver } from "mobx-react-lite";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import LoadingWheel from "../../components/LoadingWheel";
import styles from "./Loading.module.css";
import { useStore } from "../../hooks";
import { STATES } from "../../consts";

const Loading = () => {

    const { uiStore } = useStore();

    const handleLoading = () => {
        setTimeout(logmethod, 6000);
    }

    const logmethod = () => {
        uiStore.setAddStoryState(STATES.ADDSTORY_STATE_CORE)
    }

    return useObserver(() => (

        <div onLoad={handleLoading}>
            <div className={styles.gridbox}>
                <div className={styles.titleBlock}>
                    <h1 className={styles.hidden}>Prepare to reveal imagination</h1>
                    <h1 className={styles.hidden}>Prepare to be challanged</h1>
                </div>
                <img className={styles.koepel} src="/assets/img/IMAGINATION/koepelRolesKip.svg" />
                <div className={styles.pictures}>
                    <img className={styles.boek} src="/assets/img/IMAGINATION/boek.svg" />
                    <img className={styles.driehoek} src="/assets/img/IMAGINATION/driehoek.svg" />

                    <div className={styles.deur}>
                        <img className={styles.leftDoor} src="/assets/img/IMAGINATION/loaderLeft.svg" />
                        <img className={styles.rightDoor} src="/assets/img/IMAGINATION/loaderRight.svg" />
                        <div className={styles.LoadingWheel}>
                            <LoadingWheel/>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>

    ));
};

export default Loading;