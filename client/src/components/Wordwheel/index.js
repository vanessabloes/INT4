import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import WordModel from "../../models/WordModel";
import React from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const pos = require('pos');

//recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.continuous = true;

const Wordwheel = () => {

    const { coreStore, wordStore } = useStore();


    let listening = "yes";


    const toggleListening = () => {
        if (listening === "no") {
            console.log(listening);
            stopListening();
            // coreStore.setListening("play");
            listening = "yes";
        } else if (listening === "yes") {
            console.log(listening);
            startListening();
            // coreStore.setListening("pause");
            listening = "no";
        }
        return listening;
    }

    const startListening = () => {
        console.log("START");
        recognition.start();
    }

    const stopListening = () => {
        console.log("STOP");
        recognition.stop();
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
                if (noun !== "m" && noun !== "re" && noun !== "ll" && noun !== "t" && noun !== "doesn" && noun !== "wouldn" && noun !== "ve" && noun !== "aren" && noun !== "couldn" && noun !== "penis" && noun !== "vagina" && noun !== "cock") {
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
            <p>Counter</p>

            <button onClick={() => toggleListening()}>PUSHHH
            </button>

            {/* {coreStore.listening === "pause" ? "PAUSE" : "PLAY"} */}

            <div>
                {wordStore.spokenNouns.length === 0 ? (
                    <p></p>
                ) : (
                        wordStore.spokenNouns.map(noun => (
                            <li key={noun.id}>{noun.content}</li>
                        ))
                    )}
            </div>

            <button>Back to Journey</button>
            <button>Take Challenge</button>
        </>
    ));
};

export default Wordwheel;