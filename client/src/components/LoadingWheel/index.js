import React from "react";
import styles from "./LoadingWheel.module.css";

const LoadingWheel = () => {

    return  (
        <div className={styles.loadingdiv}>
            <img className={styles.loading} src="/assets/img/IMAGINATION/laadsymbol.svg" />
            <p className={styles.laadknop_text}>Loading...</p>
        </div>

    );
};

export default LoadingWheel;