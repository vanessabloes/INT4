import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import TheePot from "../../components/buttons/Algemeen/TheePotFlow";
import { ROUTES } from "../../consts";
import { useStore } from "../../hooks";
import styles from "./Challenge.module.css"
import Mask from "../Mask";
import PageTitle from "../PageTitle/PageTitle";

const Challenge = (roleId) => {
    const [state, setState] = useState(false);
    
    const { challengeStore } = useStore();
    roleId = "1"
    const role = undefined; 

    const challenge = challengeStore.getChallengeByRoleId(roleId)
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
                <PageTitle title={"Prepper, lead your clan back on track"}  subtext={"Scurrent story inladen: tory 1: From Wheel to Pan"}/>
            </div>
            {/* <Mask /> */}
            <p style={{color: "green"}} className={styles.title}>hier het makser van de prepper gebruiker</p>
            
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
                <TheePot text="We're back on track" onClick={"ff"} />
            </div>
        </div>
    ));
};

export default Challenge;
