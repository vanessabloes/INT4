import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import styles from "./MaskSmall.module.css";

const MaskSmall = ({ clanMember }) => {

    const { topMaskStore, middleMaskStore, bottomMaskStore } = useStore();

    return useObserver(() => (
        <>
            <div className={styles.maskWrapper}>
                <img height="70" className={styles.maskTop} src={topMaskStore.resolveTopMask(clanMember.topMaskId).topImage} alt="topmask"/>
                <img height="25" className={styles.maskMiddle} src={middleMaskStore.resolveMiddleMask(clanMember.middleMaskId).middleImage} alt="topmask"/>
                <img height="45" className={styles.maskBottom} src={bottomMaskStore.resolveBottomMask(clanMember.bottomMaskId).bottomImage} alt="topmask"/>
            </div>
            <p className={styles.name}>{clanMember.name}</p>
       </>
    ));
};

export default MaskSmall;
