import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import Mask from "../Mask";

const PowerOverlay = ({ wayfarer }) => {

    const { uiStore, clanMemberStore } = useStore();

    const closeOverlay = () => {
        uiStore.setVisibilityPower(false);
    }


    return useObserver(() => (
        <>
            <h1>{wayfarer.roleId.name} used his power!</h1>
            <Mask clanMember={clanMemberStore.resolveClanMember(wayfarer.clanMemberId)} />
            <p>{wayfarer.roleId.powerDescription} </p>
            <button onClick={closeOverlay}>Accept Challenge</button>
        </>
    ));
};

export default PowerOverlay;