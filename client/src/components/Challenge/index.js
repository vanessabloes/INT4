import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import TheePot from "../../components/buttons/Algemeen/TheePotFlow";
import { useStore } from "../../hooks";
import styles from "./Challenge.module.css"
import Mask from "../Mask";
import PageTitle from "../PageTitle/PageTitle";
import TheePotLink from "../buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";



const Challenge = (roleId) => {
    const [state, setState] = useState(false);
    
    const { challengeStore, uiStore, roleStore } = useStore();
    
    const role = undefined; 

    const challenge = challengeStore.getChallengeByRoleId(uiStore.currentJourney.wayfarers[0].roleId)
    console.log(challenge);
    
    const handleIndoorClick = () => {
        console.log("handleClick")
        setState(true)
    }
    
    const handleOutdoorClick = () => {
        console.log("handleClick")
        setState(false)
    }
    
    return useObserver(() => (
        <div className={styles.challengePage}>
            <div className={styles.pageTitle}>
                
                <PageTitle title={roleStore.resolveRole(uiStore.currentJourney.wayfarers[0].roleId).roleName + " has to lead his clan back on track"}  subtext={"Scurrent story inladen: tory 1: From Wheel to Pan"}/>

            </div>
            {uiStore.currentJourney.wayfarers[0].name}
            <Mask clanMember={uiStore.currentJourney.wayfarers[0]}/>

            
            <div className={styles.center}>         
                <div className={styles.buttonWrapper}>
                     <button className={styles.button} style={ state ? {backgroundColor: "#FF8A00"} : {backgroundColor: "#FFFBF1"}} onClick={handleIndoorClick} > 
                         <p>indoor</p>
                     </button>
                     <button className={styles.button} style={ state ? {backgroundColor: "#FFFBF1"} : {backgroundColor: "#FF8A00"}} onClick={handleOutdoorClick}> 
                         <p>outdoor</p>
                     </button>
                </div>

                <div className={styles.challengeWrapper}>
                     <p className={styles.title}>The challenge</p>
                         {state ? 
                             <p className={styles.text}>{challenge.indoor}</p>
                         : 
                             <p className={styles.text}>{challenge.outdoor}</p>
                         }
                </div>
            </div>   
            <div className={styles.button}>
                <TheePotLink text="We're back on track" linkTo={ROUTES.journeyDetail.to + uiStore.currentJourney.id} />
            </div>
        </div>
    ));
};

export default Challenge;
