import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import styles from "./MaskNoName.module.css";

const MaskNoName = ({ clanMember }) => {

    const { topMaskStore, middleMaskStore, bottomMaskStore } = useStore();

    return useObserver(() => (
        <div className={styles.maskContainer}>
            <div className={styles.maskWrapper}>
                <img alt="top piece of mask" className={styles.maskTop} src={topMaskStore.resolveTopMask(clanMember.topMaskId).topImage} />
                <img alt="middle piece of mask"className={styles.maskMiddle} src={middleMaskStore.resolveMiddleMask(clanMember.middleMaskId).middleImage} />
                <img alt="bottom piece of mask"className={styles.maskBottom} src={bottomMaskStore.resolveBottomMask(clanMember.bottomMaskId).bottomImage} />
            </div>
        </div>
    ));
};

export default MaskNoName;
