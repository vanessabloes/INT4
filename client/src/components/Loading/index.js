import React from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./Loading.module.css";

const Loading = () => {
    return useObserver(() => (
        <div className={styles.gridbox}>
      
        <div className={styles.titleBlock}>
        <h1 className={styles.hidden}>Prepare to reveal imagination</h1>
        <h1 className={styles.hidden}>Prepare to be challanged</h1>
        </div>

        <img className={styles.koepel}src="/assets/img/IMAGINATION/koepelRolesKip.svg"/>

        <div className={styles.pictures}>
        <img className={styles.boek} src="/assets/img/IMAGINATION/boek.svg"/>
        <img className={styles.driehoek} src="/assets/img/IMAGINATION/driehoek.svg"/>
        <div className={styles.loadingdiv}>
        <img className={styles.loading} src="/assets/img/IMAGINATION/laadsymbol.svg"/>
        <p className={styles.laadknop_text}>loading...</p>

        </div>
        </div>

      
        </div>
    ));
};

export default Loading;