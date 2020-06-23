import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
//import styles from "./Role.module.css"


const ProgressFlame = () => {
    const { uiStore } = useStore();
  return useObserver (() => (
    <ul>
            {uiStore.currentStory.definedStoryWords.map(definedStoryWord => (
                
                    <li key={definedStoryWord.id}>{definedStoryWord.content}</li>
                
            ))}
            </ul>
  ));
};

export default ProgressFlame;


