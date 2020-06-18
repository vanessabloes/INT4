import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import styles from "./Loading.module.css";

const Loading = () => {

    const { coreStore } = useStore();

    return useObserver(() => (
        
        <div>
                        <div className={styles.gridbox}>
                        <div className={styles.titleBlock}>
                        <h1 className={styles.hidden}>Prepare to reveal imagination</h1>
                        <h1 className={styles.hidden}>Prepare to be challanged</h1>
                        </div>
                        <img className={styles.koepel}src="/assets/img/IMAGINATION/koepelRolesKip.svg"/>
                        <div className={styles.pictures}>
                        <img className={styles.boek} src="/assets/img/IMAGINATION/boek.svg"/>
                        <img className={styles.driehoek} src="/assets/img/IMAGINATION/driehoek.svg"/>
                      
                        <div className={styles.deur}>
                        <img className={styles.leftDoor} src="/assets/img/IMAGINATION/loaderLeft.svg"/>
                        <img className={styles.rightDoor} src="/assets/img/IMAGINATION/loaderRight.svg"/>
                        </div>
                        
                        <div className={styles.loadingdiv}>
                        <img className={styles.loading} src="/assets/img/IMAGINATION/laadsymbol.svg"/>
                        <p className={styles.laadknop_text}>loading...</p>
                        </div>
                        </div>
                        </div>

            <button
                value="core"
                onClick={e => coreStore.setState("core")}>
                <TheePotFlow text="Start storytelling" />
            </button>
        </div>
       
    ));
};

export default Loading;