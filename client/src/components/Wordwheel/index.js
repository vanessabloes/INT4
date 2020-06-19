import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import WordModel from "../../models/WordModel";
import React, { useState } from 'react';
import styles from "./Wordwheel.module.css"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const pos = require('pos');

//recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.continuous = true;

const Wordwheel = () => {

    const { coreStore, wordStore } = useStore();
    const [play, setPlay] = useState(false);

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
            //console.log(taggedWords[i]);
            //console.log(taggedWords[i][1]);
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
        //console.log("noun", noun);
        const word = new WordModel({
            content: noun
        });
        //console.log(wordStore);
        wordStore.addWord(word);
    }

    return useObserver(() => (
        <>
            <p>Woorden wiel:</p>
            <p>{wordStore.wordCounter}</p>

            <div className={styles.circle__wrapper}>

                <button onClick={togglePlay}>
                    {play ? <img alt="play button" className={styles.toggle__btn} src="/assets/img/GAME/pause.svg" /> : <img className={styles.toggle__btn} alt="pause button" src="/assets/img/GAME/play.svg" />}
                </button>

                {play ? <div className={styles.wave}></div> : <div className={styles.line}></div>}

                <img className={styles.cirlce} alt="illustration of wheel with eyes" src="/assets/img/GAME/circle.svg" />

            </div>

            <div>
                {wordStore.spokenNouns.length === 0 ? (
                    <p></p>
                ) : (
                        wordStore.spokenNouns.map(noun => (
                            <li className={styles.word} key={noun.id}>{noun.content}</li>
                        ))
                    )}
            </div>

            <img src="/assets/img/GAME/pointer.svg" />

            <button>Back to Journey</button>
            <button>Take Challenge</button>
        </>
    ));
};

export default Wordwheel;