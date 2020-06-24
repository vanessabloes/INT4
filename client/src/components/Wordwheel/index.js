import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import React from 'react';
import styles from "./Wordwheel.module.css"
import RecognitionCircle from "../RecognitionCircle";



 const Wordwheel = () => {

    const { uiStore } = useStore();


    return useObserver (() => (
  
        <>

            <div className={styles.circle__wrapper}>

                <div className={styles.cirlce__content}>

                <RecognitionCircle />
                  
                </div>

                <img className={styles.cirlce__img} alt="illustration of wheel with eyes" src="/assets/img/GAME/circle.svg" />
                

                

            </div>

            <svg style={{position: "absolute", top: "-15rem"}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">
  <title>Red Hot Chilli Peppers Logo</title>
<defs>
	<path d="M40,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250" id="textcircle">
	
 
	</path>

</defs>
	
	<text className={styles.word}dy="50" textLength="1220">

        <textPath xlinkHref="#textcircle">
        {uiStore.currentStory.words.map(noun => (
                            noun.content + String.fromCharCode(160) + String.fromCharCode(160)
                        ))}
                
        </textPath>
	</text>
</svg>


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