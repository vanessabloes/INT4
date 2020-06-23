import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import styles from "./MaskMedium.module.css";

const MaskMedium = ({ clanMember }) => {

    const { topMaskStore, middleMaskStore, bottomMaskStore } = useStore();

    return useObserver(() => (
        <>
            <div className={styles.maskWrapper}>
                <img height="100" className={styles.maskTop} src={topMaskStore.resolveTopMask(clanMember.topMaskId).topImage} alt="topmask" />
                <img height="46" className={styles.maskMiddle} src={middleMaskStore.resolveMiddleMask(clanMember.middleMaskId).middleImage} alt="topmask" />
                <img height="75" className={styles.maskBottom} src={bottomMaskStore.resolveBottomMask(clanMember.bottomMaskId).bottomImage} alt="topmask" />
            </div>
            <p className={styles.name}>{clanMember.name}</p>
        </>
    ));
};

export default MaskMedium;
