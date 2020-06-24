import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import styles from "./ProgressFlame.module.css"


const ProgressFlame = (words) => {
  const { uiStore } = useStore();
  const definedStoryWords = uiStore.currentStory.definedStoryWords;
  const definedStoryWordsWithoutFirstAndLast = [];
  let active = undefined;

const checkIndex = () => {

  definedStoryWords.forEach(definedStoryWord => {
    console.log(definedStoryWord.isReached)
    if(definedStoryWords.indexOf(definedStoryWord) !== 0 && definedStoryWords.indexOf(definedStoryWord) !== definedStoryWords.length - 1){
      !definedStoryWordsWithoutFirstAndLast.includes(definedStoryWord) && definedStoryWordsWithoutFirstAndLast.push(definedStoryWord);
    }
    if(definedStoryWord.isReached === "true" && definedStoryWords[definedStoryWords.indexOf(definedStoryWord)].isReached === "false"){
      
      active = definedStoryWords[definedStoryWords.indexOf(definedStoryWord)];
      console.log(active)
    }else{
      console.log("all true")
    }
    // if(definedStoryWord.isReached === "true" && definedStoryWords.indexOf(definedStoryWords[definedStoryWord.length].isReached === "false")){
    //        active = definedStoryWords.indexOf(definedStoryWords[definedStoryWord.length]);
    //     }else{
    //        active = definedStoryWords[0];
    //     }
    //     console.log(active.content);
  
  });
  // definedStoryWords.forEach(definedStoryWord => {
  //   if(definedStoryWord.isReached === "true" && definedStoryWords.indexOf(definedStoryWords[definedStoryWord.length].isReached === "false")){
  //      active = definedStoryWords.indexOf(definedStoryWords[definedStoryWord.length]);
  //   }else{
  //      active = definedStoryWords[0];
  //   }
  //   console.log(active.content);
  // });
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
              {active !== definedStoryWord ? 
              <img className={styles} src={definedStoryWord.isReached === "false" ? "/assets/img/game/bar/lucifer_old.svg" : `/assets/img/game/bar/luciferBurnedVertical.svg`} alt={definedStoryWord.content} />
                :   <img className={styles} src="/assets/img/game/bar/luciferActive.svg" alt={definedStoryWord.content} />   }         
              
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