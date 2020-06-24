import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import styles from "./RecognitionUi.module.css";

const RecognitionUi = () => {

    const { uiStore } = useStore();

    return useObserver(() => (
        <>
        <p className={styles.circle__counter}>{uiStore.currentJourney.wordCounter}</p>
        
     
       </>
    ));
};

export default RecognitionUi;
