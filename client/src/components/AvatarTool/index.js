import React from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./AvatarTool.module.css";
import { useStore } from "../../hooks";






const AvatarTool = () => {


const { uiStore, topMaskStore, middleMaskStore, bottomMaskStore } = useStore();


let topCount = 1;
let middleCount = 0;
let bottomCount = 0;


const handleSubmitForm = e => {
    e.preventDefault();
    // addClanMember
}

const closeOverlay = () => {
    uiStore.setVisibility(false);
}

const handleTopCount = value => {
    
    if(value === "down"){
        uiStore.setTopCount();
        console.log(topCount)

    }else{
        topCount ++;
        console.log(topCount)
    }
}
const handleMiddleCount = value => {
    if(value === "down"){
        middleCount --;
    }else{
        middleCount ++;
    }
}
const handleBottomCount = value => {
    if(value === "down"){
        bottomCount --;
    }else{
        bottomCount ++;
    }
}
    return useObserver(() => (
        
        <div className={styles.test}>
            <button onClick={closeOverlay}>X</button>
            <form className={styles.form} onSubmit={(e) => handleSubmitForm(e)}>
                <div className={styles.avatarImageWrapper}>
                <div className={styles.buttonWrapper}>
                    <button onClick={() => handleBottomCount("down")}>&lt;</button>
                    <button onClick={() => handleMiddleCount("down")}>&lt;</button>
                    <button onClick={() => handleBottomCount("down")}>&lt;</button>
                </div>
                <div className={styles.maskContainer}>
                   
                        
                        <img className={styles.maskTop} src={topMaskStore.topMasks[topCount].topImage} alt="top mask image"/>
                        
               
             
                        
                        <img className={styles.maskMiddle} src={middleMaskStore.middleMasks[middleCount].middleImage} alt="middle mask image"/>
                        
          
          
                        
                        <img className={styles.maskBottom} src={bottomMaskStore.bottomMasks[bottomCount].bottomImage} alt="bottom mask image"/>
                        
          
                </div>
                    <div className={styles.buttonWrapper}>
                        <button onClick={() => handleTopCount("up")}>&gt;</button>
                        <button onClick={() => handleMiddleCount("up")}>&gt;</button>
                        <button onClick={() => handleBottomCount("up")}>&gt;</button>
                    </div>
                </div>
                <div className={styles.inputElements}>
                <label>
                    Nickname<input/>
                </label>

                <label>
                    Age<input/>
                </label>

                <input type='submit' value="Create avatar"/>
                </div>
            </form>
            
        </div>
    ));
};

export default AvatarTool;
