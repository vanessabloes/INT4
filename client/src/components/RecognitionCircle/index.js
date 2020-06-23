import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import WordModel from "../../models/WordModel";
import React, { useState } from 'react';
import styles from "./RecognitionCircle.module.css"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const pos = require('pos');

//recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.continuous = true;

const RecognitionCircle = () => {
    const { wordStore, uiStore, definedStoryWordStore } = useStore();
    const [play, setPlay] = useState(false);

   const definedStoryWords = uiStore.currentStory.definedStoryWords;
 



    // handles refresh pitStopCount
    if(uiStore.pitStopCount === 0){

        definedStoryWords.forEach(definedStoryWord => {
            // sets first definedstoryword always true  ------WERKT NIET------
            if(definedStoryWords.indexOf(definedStoryWords === 0)){
                const firstDefinedStoryWordToCheck = definedStoryWordStore.resolveDefinedStoryWord(definedStoryWords[0].id);
                firstDefinedStoryWordToCheck.setReached('true');
            }
            // checks all true's and ups the pitstopcount to be in sync with server
            if(definedStoryWord.isReached === "true"){
                uiStore.setPitStopCount(1);
            }
        });
    }
 
    
     const togglePlay = () => {
         setPlay(!play);
         if (!play) {
             recognition.start();
             console.log("is aant recorden");
         } else {
             recognition.stop();
             console.log("is aant stoppen");
         }
     }
 
     recognition.onresult = (e) => {
 
         if (e.results[0].isFinal === true) {
             let current = e.resultIndex;
             let transcript = e.results[current][0].transcript;
             console.log(transcript);
             findNouns(transcript);
         }
     }
 
     const findNouns = transcript => {
         console.log(transcript);
         const words = new pos.Lexer().lex(transcript);
         const tagger = new pos.Tagger();
         const taggedWords = tagger.tag(words);
         let i;
         for (i = 0; i < taggedWords.length; i++) {


             if (taggedWords[i][1] === "NN" || taggedWords[i][1] === "NNP" || taggedWords[i][1] === "NNPS" || taggedWords[i][1] === "NNS") {
                 const noun = taggedWords[i][0];
                 if (noun !== "m" && noun !== "re" && noun !== "ll" && noun !== "t" && noun !== "doesn" && noun !== "wouldn" && noun !== "ve" && noun !== "aren" && noun !== "couldn" && noun !== "penis" && noun !== "vagina" && noun !== "cock" && noun !== "dick" && noun !== "f***") {
                     console.log("noun", taggedWords[i][0]);
                     addNoun(taggedWords[i][0]);
                 }
             }
         }
     }
     
     const addNoun = noun => {
         if(noun === "alter"){
             noun = "altar";
         }

         const word = new WordModel({
             content: noun.toLowerCase(),
             storyId: uiStore.currentStory.id,
             store: wordStore
         });
         console.log(word)

 
         
 
 
        
 

         

 
         if(uiStore.pitStopCount < definedStoryWords.length){ // zolang de count kleiner is dan de lengte van alle definedstorywords doe je de logica
             const definedStoryWordToCheck = definedStoryWordStore.resolveDefinedStoryWord(uiStore.currentStory.definedStoryWords[uiStore.pitStopCount].id);
             // eerste woord altijd true
            
            
             if(definedStoryWordToCheck.content === word.content){
                 definedStoryWordToCheck.setReached("true");
                 definedStoryWordToCheck.update();
             }
     
             if(definedStoryWordToCheck.isReached === "true"){ // als de isReached true is van definedstoryword op counter pos, verhoog de counter met 1
                  uiStore.setPitStopCount(1) ;
                  console.log("pitstop increased");
                  console.log("match");
              }
 
         word.create();
     
    }
 }
  return useObserver (() => (
      <>

    <p className={styles.circle__counter}>{wordStore.wordCounter}</p>

    {play ? <div className={styles.wave}></div> : <div className={styles.line}></div>}

    <button className={styles.toggle__btn} onClick={togglePlay}>
        {play ? <img className={styles.toggle__icon} alt="play button" src="/assets/img/GAME/pause.svg" /> : <img className={styles.toggle__icon} alt="pause button" src="/assets/img/GAME/play.svg" />}
    </button>
    </>
  ));
};

export default RecognitionCircle;

