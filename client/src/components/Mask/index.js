import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import styles from "./Mask.module.css";

const Mask = ({clanMember}) => {

    const { topMaskStore, middleMaskStore, bottomMaskStore } = useStore();

    return useObserver(() => (
        <div className={styles.maskContainer}>
            <div className={styles.maskWrapper}>
                <img className={styles.maskTop} src={topMaskStore.resolveTopMask(clanMember.topMaskId).topImage}/>
                <img className={styles.maskMiddle} src={middleMaskStore.resolveMiddleMask(clanMember.middleMaskId).middleImage}/>
                <img className={styles.maskBottom} src={bottomMaskStore.resolveBottomMask(clanMember.bottomMaskId).bottomImage}/>
            </div>
            <p className={styles.name}>{clanMember.name}</p>
        </div>
    ));
};

export default Mask;
