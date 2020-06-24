import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import React from 'react';
import styles from "./Wordwheel.module.css"
import RecognitionCircle from "../RecognitionCircle";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";

import { STATES } from "../../consts";
import Power from "../Power";
import PowerOverlay from "../PowerOverlay";


const Wordwheel = () => {

    const { uiStore } = useStore();

    const countWayfarers = uiStore.currentJourney.wayfarers.length;
    const arc = 360 / countWayfarers;
    let graden = null;

    const handleChallenge = () => {
        uiStore.setAddStoryState(STATES.ADDSTORY_STATE_CHALLENGE);
    }

    return useObserver(() => (

        <>
        <div className={styles.wheelPowerWrapper}>
            <div className={styles.circle__wrapper}>
                <div className={styles.recognitionCircle}>
                    {uiStore.currentJourney.wordCounter !== 0 ?
                    <RecognitionCircle />
                   :   <TheePotFlow onClick={handleChallenge} text="Find your way back" />  }
                </div>
                {/* <img className={styles.cirlce__img} alt="illustration of wheel with eyes" src="/assets/img/GAME/circle.svg" /> */}
                <img className={styles.arrow} src="/assets/img/GAME/pointerVertical.svg" alt={"arrow"}/>
            </div>

            

            <div >
                <svg style={{ position: "absolute", top: "15rem", zIndex: "0", pointerEvents: "none" }}  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">
                    <defs>
                        <path d="M40,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250" id="textcircle"></path>
                    </defs>

                    <text className={styles.word} dy="50" textLength="1220">
                        <textPath xlinkHref="#textcircle">
                            {uiStore.currentStory.words.map(noun => (
                                noun.content + String.fromCharCode(160) + String.fromCharCode(160)
                            ))}
                        </textPath>
                    </text>
                </svg>
            </div>
            
           

            <ul className={styles.wayfarersList}>
                {uiStore.currentJourney.wayfarers.map(wayfarer => (
                    graden = (0 + (uiStore.currentJourney.wayfarers.indexOf(wayfarer) * arc)),
                    <li className={styles.wayfarersListItem} style={{ transform: `rotate(${graden}deg) translate(0rem, 30rem)` }}>
                        <Power wayfarer={wayfarer} />
                    </li>
                ))}
                {uiStore.visibilityPower ? <PowerOverlay id={uiStore.selectedPowerId} /> : ""}
            </ul>
 
        </div>

            <button className={styles.button}
                value="challenge"
                onClick={e => uiStore.setAddStoryState(STATES.ADDSTORY_STATE_CHALLENGE)}>
             
            </button>
           

        </>
    ));
};

export default Wordwheel;