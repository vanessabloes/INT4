import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import MaskNoName from "../MaskNoName";

const PowerOverlay = ({ id }) => {

    const { uiStore, clanMemberStore, wayfarerStore, topMaskStore } = useStore();

    const closeOverlay = () => {
        uiStore.setVisibilityPower(false);
    }


    return useObserver(() => (
        <>
            <h1>{wayfarerStore.resolveWayfarer(id).name} used his power!</h1>
            <MaskNoName clanMember={wayfarerStore.resolveWayfarer(id)} />
            {/* <p>{wayfarer.roleId.powerDescription} </p> */}
            <button onClick={closeOverlay}>Accept Challenge</button>
        </>
    ));
};

export default PowerOverlay;