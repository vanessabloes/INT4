import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import PowerOverlay from "../PowerOverlay";

const Power = ({ wayfarer }) => {

    const { clanMemberStore, roleStore, uiStore } = useStore();

    const showOverlay = () => {
        uiStore.setVisibilityPower(true)
        uiStore.setSelectedPower(wayfarer.clanMemberId);
    }

    return useObserver(() => (
        <>
            <p>{clanMemberStore.resolveClanMember(wayfarer.clanMemberId).name}</p>
            <button onClick={showOverlay}><img src={wayfarer.roleId.image} alt="icon of power" /></button>
            <p>{wayfarer.roleId.roleName}</p>
        </>
    ));
};

export default Power;