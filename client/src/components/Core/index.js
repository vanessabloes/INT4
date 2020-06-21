import React from "react";
import { useObserver } from "mobx-react-lite";

import Pitstops from "../Pitstops";
import Power from "../Power";
import Wordwheel from "../Wordwheel";

import { useStore } from "../../hooks";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";

import { STATES } from "../../consts";
import Manual from "../Manual";
import PageTitle from "../PageTitle/PageTitle";



const Core = () => {

    const { uiStore } = useStore();

    return useObserver(() => (
        <>
            <PageTitle title={"story 1"}/>
            <Pitstops />
            <Power />
            <Wordwheel />
            <Manual/>
            <button
                value="challenge"
                onClick={e => uiStore.setAddStoryState(STATES.ADDSTORY_STATE_CHALLENGE)}>
                <TheePotFlow
                    text="Find your way back" />
            </button>
            <TheePotLink text="Add Story" linkTo={ROUTES.path} />
        </>
    ));
};

export default Core;