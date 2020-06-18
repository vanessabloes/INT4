import React from "react";
import { useObserver } from "mobx-react-lite";

import Pitstops from "../Pitstops";
import Power from "../Power";
import Wordwheel from "../Wordwheel";

import { useStore } from "../../hooks";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";

const Core = () => {

    const { coreStore } = useStore();
    console.log(coreStore.state);

    return useObserver(() => (
        <>
            <p>CORE</p>
            <Pitstops />
            <Power />
            <Wordwheel />
            <button
                value="challenge"
                onClick={e => coreStore.setState("challenge")}>
                <TheePotFlow
                    text="Find your way back" />
            </button>
            <TheePotLink text="Add Story" linkTo={ROUTES.path} />
        </>
    ));
};

export default Core;