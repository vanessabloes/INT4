import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import styles from "./ProgressFlame.module.css"


const ProgressFlame = (words) => {
  const { uiStore } = useStore();

   words =["test", "paard", "woord3", "toetsenbord", "huizen", "woord6"];

  return useObserver (() => (
    <>
    
    

        

      <div className={styles.procesBar}>
        <h1 className={styles.story}>Story 1</h1>
        <p className={styles.task}>In your world cars don’t exit</p>
        <p className={styles.starWord}>wheel</p>
        <p className={styles.endWord}>wheel</p>
          
        <div className={styles.bluebar}></div>
        <img className={styles.leftFlam} src="/assets/img/game/bar/leftFlam.svg" alt={"leftFlam"} />
        <img className={styles.rightFlam} src="/assets/img/game/bar/rightFlam.svg" alt={"rightFlam"} />
        <ul className={styles.wordsList}>
          {words.map( word => (
            <li  className={styles.wordListItem} key={word}>
              <img className={styles} src="/assets/img/game/bar/luciferBurnedVertical.svg" alt={word} />
              <p className={styles.word}>{word}</p>
            </li>
          ))}
        </ul>
      </div>
      </>
  ));
};

export default ProgressFlame;


{/* <ul>
      {uiStore.currentStory.definedStoryWords.map(definedStoryWord => (        
        <li key={definedStoryWord.id}>{definedStoryWord.content}</li>    
      ))}
    </ul> */}