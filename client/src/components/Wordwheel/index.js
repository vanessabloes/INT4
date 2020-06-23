import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import WordModel from "../../models/WordModel";
import React, { useState } from 'react';
import styles from "./Wordwheel.module.css"
import RecognitionCircle from "../RecognitionCircle";


// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();
// const pos = require('pos');

// //recognition.interimResults = true;
// recognition.lang = 'en-US';
// recognition.continuous = true;

 const Wordwheel = (DFW) => {
    
//    // let pitStopCount = 0;
    const { wordStore, uiStore, definedStoryWordStore } = useStore();
//     const [play, setPlay] = useState(false);
//    // const [pitStopCount, setPitStopCount] = useState(0);



//    // when reloading page, reload the pitStopCounter
//    const definedStoryWords = uiStore.currentStory.definedStoryWords;

//    if(uiStore.pitStopCount === 0){
//        definedStoryWords.forEach(definedStoryWord => {
//            if(definedStoryWord.isReached === "true"){
//                uiStore.setPitStopCount(1);
//            }
//        });
//    }

   
//     const togglePlay = () => {
//         setPlay(!play);
//         if (!play) {
//             recognition.start();
//             console.log("is aant recorden");
//         } else {
//             recognition.stop();
//             console.log("is aant stoppen");
//         }
//     }

//     recognition.onresult = (e) => {

//         if (e.results[0].isFinal === true) {
//             let current = e.resultIndex;
//             let transcript = e.results[current][0].transcript;
//             console.log(transcript);
//             findNouns(transcript);
//         }
//     }

//     const findNouns = transcript => {
//         console.log(transcript);
//         const words = new pos.Lexer().lex(transcript);
//         const tagger = new pos.Tagger();
//         const taggedWords = tagger.tag(words);
//         let i;
//         for (i = 0; i < taggedWords.length; i++) {
//             //console.log(taggedWords[i]);
//             //console.log(taggedWords[i][1]);
//             if (taggedWords[i][1] === "NN" || taggedWords[i][1] === "NNP" || taggedWords[i][1] === "NNPS" || taggedWords[i][1] === "NNS") {
//                 const noun = taggedWords[i][0];
//                 if (noun !== "m" && noun !== "re" && noun !== "ll" && noun !== "t" && noun !== "doesn" && noun !== "wouldn" && noun !== "ve" && noun !== "aren" && noun !== "couldn" && noun !== "penis" && noun !== "vagina" && noun !== "cock" && noun !== "dick" && noun !== "f***") {
//                     console.log("noun", taggedWords[i][0]);
//                     addNoun(taggedWords[i][0]);
//                 }
//             }
//         }
//     }
    
//     const addNoun = noun => {
//         if(noun === "alter"){
//             noun = "altar";
//         }
//         //console.log("noun", noun);
//         const word = new WordModel({
//             content: noun.toLowerCase(),
//             storyId: uiStore.currentStory.id,
//             store: wordStore
//         });
//         console.log(word)
//         //console.log(wordStore);

        


       

//         // nog een check die dat herlaadt de counter
        
//        // const DSW = definedStoryWordStore.resolveDefinedStoryWord(definedStoryWordToCheck.id);

//         if(uiStore.pitStopCount < definedStoryWords.length){ // zolang de count kleiner is dan de lengte van alle definedstorywords doe je de logica
//             const definedStoryWordToCheck = definedStoryWordStore.resolveDefinedStoryWord(uiStore.currentStory.definedStoryWords[uiStore.pitStopCount].id);
            
//             if(definedStoryWordToCheck.content === word.content){
//                 definedStoryWordToCheck.setReached("true");
//                 definedStoryWordToCheck.update();
//             }
    
//             if(definedStoryWordToCheck.isReached === "true"){ // als de isReached true is van definedstoryword op counter pos, verhoog de counter met 1
//                  uiStore.setPitStopCount(1) ;
//                  console.log("pitstop increased");
//                  console.log("match");
//              }

//         word.create();
//     }
// }

    return useObserver (() => (
        <>
            <div className={styles.circle__wrapper}>

                <div className={styles.cirlce__content}>

                <RecognitionCircle />
                  
                </div>

                <img className={styles.cirlce__img} alt="illustration of wheel with eyes" src="/assets/img/GAME/circle.svg" />

            </div>


            <ul>
                {uiStore.currentStory.words.length === 0 ? (
                    <p></p>
                ) : (
                        uiStore.currentStory.words.map(noun => (
                            <li key={noun.id} className={styles.word} >{noun.content}</li>
                        ))
                    )}
            </ul>

            <img src="/assets/img/GAME/pointer.svg" />

            <button>Back to Journey</button>
            <button>Take Challenge</button>
        </>
    ));
};

export default Wordwheel;