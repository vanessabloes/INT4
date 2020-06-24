import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import MaskNoName from "../MaskNoName";
import TheePotFlow from "../buttons/Algemeen/TheePotFlow";
import styles from "./PowerOverlay.module.css";

const PowerOverlay = ({ id }) => {

    const { uiStore, roleStore, clanMemberStore, wayfarerStore, topMaskStore } = useStore();

    const closeOverlay = () => {
        uiStore.setVisibilityPower(false);
    }

    return useObserver(() => (
        <div className={styles.roleOverlay}>
            <div className={styles.roleOverlayIcons}>
                <MaskNoName clanMember={wayfarerStore.resolveWayfarer(id)} />
                <img alt="role icon" src={roleStore.resolveRole(wayfarerStore.resolveWayfarer(id).roleId).image} />
            </div>

            <h1>{wayfarerStore.resolveWayfarer(id).name} used his power!</h1>
            <p>{roleStore.resolveRole(wayfarerStore.resolveWayfarer(id).roleId).powerDescription} </p>
            {/* <p>{roleStore.resolveRole(wayfarerStore.resolveWayfarer(id).roleId).roleName} </p> */}

            <TheePotFlow onClick={closeOverlay} text="Accept challenge" />
        </div>
    ));
};

export default PowerOverlay;