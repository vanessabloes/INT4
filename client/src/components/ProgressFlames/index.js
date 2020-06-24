import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import styles from "./ProgressFlame.module.css"


const ProgressFlame = (words) => {
  const { uiStore } = useStore();
  const definedStoryWordsWithoutFirstAndLast = [];

const checkIndex = () => {
  const definedStoryWords = uiStore.currentStory.definedStoryWords;

  definedStoryWords.forEach(definedStoryWord => {

    if(definedStoryWords.indexOf(definedStoryWord) !== 0 && definedStoryWords.indexOf(definedStoryWord) !== definedStoryWords.length - 1){
      !definedStoryWordsWithoutFirstAndLast.includes(definedStoryWord) && definedStoryWordsWithoutFirstAndLast.push(definedStoryWord);
      console.log(definedStoryWords.indexOf(definedStoryWord))
    }
  
  });
 
}
checkIndex();
console.log(definedStoryWordsWithoutFirstAndLast)
  return useObserver (() => (
    <>
    
    

        

      <div className={styles.procesBar}>
        <h1 className={styles.story}>Story 1</h1>
        <p className={styles.task}>In your world cars don’t exit</p>
        <p className={styles.starWord}>{uiStore.currentStory.definedStoryWords[0].content}</p>
        <p className={styles.endWord}>{uiStore.currentStory.definedStoryWords[uiStore.currentStory.definedStoryWords.length - 1].content}</p>
          
        <div className={styles.bluebar}></div>
        <img className={styles.leftFlam} src="/assets/img/game/bar/leftFlam.svg" alt={"leftFlam"} />
        <img className={styles.rightFlam} src="/assets/img/game/bar/rightFlam.svg" alt={"rightFlam"} />
        <ul className={styles.wordsList}>
          {definedStoryWordsWithoutFirstAndLast.map(definedStoryWord => (
           
            
            
            
            <li className={styles.wordListItem} key={definedStoryWord.id}>
              
              <img className={styles} src={definedStoryWord.isReached === "false" ? "/assets/img/game/bar/lucifer_old.svg" : "/assets/img/game/bar/luciferBurnedVertical.svg"} alt={definedStoryWord.content} />
              <p className={styles.word}>{definedStoryWord.content}</p>
           
           
           
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