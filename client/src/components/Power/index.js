import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import styles from "./Power.module.css";

const Power = ({ wayfarer }) => {

    const { roleStore, uiStore } = useStore();

    const showOverlay = () => {
        uiStore.setVisibilityPower(true)
        uiStore.setSelectedPower(wayfarer.id);
    }

    return useObserver(() => (
        <>
            <button className={styles.power} onClick={showOverlay}>
                <p className={styles.powerWayfarer}>{wayfarer.name}</p>
                <img src={roleStore.resolveRole(wayfarer.roleId).image} alt="icon of power" />
                <p className={styles.powerRole}>{roleStore.resolveRole(wayfarer.roleId).roleName}</p>
            </button>
        </>
    ));
};

export default Power;