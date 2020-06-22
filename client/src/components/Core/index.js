import React from "react";
import { useObserver } from "mobx-react-lite";

import Pitstops from "../Pitstops";
import Power from "../Power";
import PowerOverlay from "../PowerOverlay";
import Wordwheel from "../Wordwheel";

import { useStore } from "../../hooks";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";

import { STATES } from "../../consts";
import Manual from "../Manual";
import PageTitle from "../PageTitle/PageTitle";
import JourneyStore from "../../stores/JourneyStore";
import { useParams } from "react-router-dom";



const Core = () => {

    const { uiStore, journeyStore } = useStore();
    const { id } = useParams();

    console.log(id);

    const wayfarers = journeyStore.resolveJourney(id).wayfarers;
    const showOverlay = () => {
        
    }

    return useObserver(() => (
        <>
            <PageTitle title={"story 1"} />
            <Pitstops />
            {uiStore.currentStory.definedStoryWords.map(definedStoryWord => (
                <ul>
                    <li>{definedStoryWord.content}</li>
                </ul>
            ))}
            {wayfarers.map(wayfarer => (
                <ul>
                    <li onClick={showOverlay}key={wayfarer.id}><Power wayfarer={wayfarer} /></li>
                    
                        <li key={wayfarer.id}><PowerOverlay wayfarer={wayfarer} /></li> 
                </ul>
            ))}

            <Wordwheel />
            <Manual />
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