import React from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./MaskLayout.module.css";



const Masklayout = () => {
    return useObserver(() => (
        <>
        <div className={styles.container}>
            <div className={styles.maskcontainer}>
                <img className={styles.mask}src="/assets/img/testmasks/testmask1.svg"/>
                <p className={styles.maskname}>Stijnelina</p>
            </div>
            <div className={styles.maskcontainer}>
                <img className={styles.mask}src="/assets/img/testmasks/testmask2.svg"/>
                <p className={styles.maskname}>Vanessalina</p>
            </div>
            <div className={styles.maskcontainer}>
                <img className={styles.mask}src="/assets/img/testmasks/testmask3.svg"/>
                <p className={styles.maskname}>Pepilina</p>
            </div>
            <div className={styles.maskcontainer}>
                <img className={styles.mask}src="/assets/img/testmasks/testmask4.svg"/>
                <p className={styles.maskname}>Sandralina</p>
            </div>
        </div>
           
        </>
    ));
};

export default Masklayout;