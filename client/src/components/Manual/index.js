import React, { useState } from "react";
import styles from "./Manual.module.css"
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";

const Manual = () => {

  const { uiStore } = useStore();

  const closeManual = () => {
    uiStore.setManualVisibility(false);
  }

  return useObserver(() => (
    <div className={styles.overlay}>
      <h1 className={styles.hidden}>Manual</h1>
      <section className={styles.manual}>
        <div className={styles.page_title}><h2 >How to tell your travel story?</h2><img onClick={closeManual} alt="close icon" src="/assets/img/BUTTONS/close.svg" /></div>

        <div className={styles.destination} >
          <h3 className={styles.subtitle}>From start to destination</h3>
          <p className={styles.bodycopy}>Light the fire and start your story. Your travel story consists of a starting word and an ending word under the blue flames. Some pitstop words are added in between, to work towards this end destination. Past pistopwords have a short grey/black extinguished matche (here first one). The current pitstopword is orange (here second one). The next pitstopwords come unde the big red matches.</p>
        </div>

        <div className={styles.image_proces_wrapper}>
          <p className={styles.image_proces_title}>Story 1</p>
          <p className={styles.image_proces_bodycopy}>In your world cars don’t exit</p>
          <img className={styles.image_proces} src="/assets/img/INFO/luciferbalk.svg" alt="story1: In your world cars don’t exit" />
          <p className={styles.image_start}>starting word</p>
          <p className={styles.image_end}>ending word</p>

        </div>


        <div className={styles.narrates} >
          <h3 className={styles.subtitle}>Who narrates when?</h3>
          <p className={styles.bodycopy}>At the beginning of each round, a narrator gets randomly chosen. Look at who the indicator, the blue wavy arrow is pointing. Press the orange play/pause button under the word counter when you start or stop telling. When you press the play button and the wheel starts listening the soundwave will start moving.</p>
        </div>
        <img className={styles.image_circle} src="/assets/img/INFO/WhoNarratesWhen.svg" alt="Who narrates when?" />
        <div>
          <h3 className={styles.subtitle}>The wordcounter</h3>
          <p className={styles.bodycopy}>During your storytelling a wordcounter counts down (here 22). It is intented that you have to link the startword with the endword before the counter reaches 0. Should the counter hit 0 before you reach the endword, you get lost in imagination. The role who who was the last to narrate has to complete a challenge with the clan to get back on track.</p>
        </div>
        <div>
          <h3 className={styles.subtitle}>The goal</h3>
          <p className={styles.bodycopy}>As narrator you have to link the current word and the next pitstopword by storytelling. During your storytelling, you can be challenged by the powers of the different roles to adapt your story to their input.</p>
        </div>
      </section>

      <section className={styles.roles}>
        <h2 className={styles.page_title_roles}>What do these roles mean?</h2>
        {/* <Role /> */}
        <article className={styles.role_wrapper}>
          <div>
            <h3 className={styles.subtitle}>The Explorer</h3>
            <p className={styles.bodycopy_italic}>Always diverges from the plan.</p>
            <p className={styles.bodycopy}>The explorer is always looking to broaden his horizon. Every possibility he has to diverge from the plan he’ll take adding a fresh breeze in your journey.</p>
            <h4 className={styles.subtitle}>Power:</h4>
            <p className={styles.bodycopy}>Change a pitstop word with a random word</p>
          </div>
          <img className={styles.role_image} src="/assets/img/ROLES/explorer.svg" alt="Who narrates when?" />
        </article>
        <article className={styles.role_wrapper}>
          <div>
            <h3 className={styles.subtitle}>The Budgeteer</h3>
            <p className={styles.bodycopy_italic}>Carefully spends his money </p>
            <p className={styles.bodycopy}>Gettin far agssibsle with as little as possible money is wheat he is best at. He's a star at fixing nice deals. </p>
            <h4 className={styles.subtitle}>Power:</h4>
            <p className={styles.bodycopy}>When a pitstop word is reached in max. 5 words, add 5 words to the counter.</p>
          </div>
          <img className={styles.role_image} src="/assets/img/ROLES/budgeteer.svg" alt="Who narrates when?" />
        </article>
        <article className={styles.role_wrapper}>
          <div>
            <h3 className={styles.subtitle}>The siesta (all-in tourist)</h3>
            <p className={styles.bodycopy_italic}>Time is relative, all is chill.</p>
            <p className={styles.bodycopy}>Going everywhere without a solid plan is what the siesta is all about. He does everything on his way and likes to take his time for everything. because of that he can skip his turn on the wheel.</p>
            <h4 className={styles.subtitle}>Power:</h4>
            <p className={styles.bodycopy}>Skip your turn (spin the weel).</p>
          </div>
          <img className={styles.role_image} src="/assets/img/ROLES/siesta.svg" alt="Who narrates when?" />
        </article>
        <article className={styles.role_wrapper}>
          <div>
            <h3 className={styles.subtitle}>The prepper</h3>
            <p className={styles.bodycopy_italic}>Need anything? I got what you need.</p>
            <p className={styles.bodycopy}>The Prepper is always preppered for everything. With his bag fun of handy tools no surprise will stope him. Even in the hardest situations he has a solution in his bag.</p>
            <h4 className={styles.subtitle}>Power:</h4>
            <p className={styles.bodycopy}>Show a random object to use in the current pitstop.</p>
          </div>
          <img className={styles.role_image} src="/assets/img/ROLES/prepper.svg" alt="Who narrates when?" />
        </article>
        <article className={styles.role_wrapper}>
          <div>
            <h3 className={styles.subtitle}>The foodie</h3>
            <p className={styles.bodycopy_italic}>Always let himself go with food on a holiday.</p>
            <p className={styles.bodycopy}>Travelling is al about the food isn't it? The foody loves to discover new local food. No taste is to exotic for him. Any ingrediant you name him he'll tell you in witch dich you can tast it.</p>
            <h4 className={styles.subtitle}>Power:</h4>
            <p className={styles.bodycopy}>Play a random (not-abstract) sound to incorporate in the current pitstop.</p>
          </div>
          <img className={styles.role_image} src="/assets/img/ROLES/foodie.svg" alt="Who narrates when?" />
        </article>
        <article className={styles.role_wrapper}>
          <div>
            <h3 className={styles.subtitle}>The lovestrucked</h3>
            <p className={styles.bodycopy_italic}>Always gets himself in a vacation love.</p>
            <p className={styles.bodycopy}>He cant survive a vacation on his own and falls in love very easily. </p>
            <h4 className={styles.subtitle}>Power:</h4>
            <p className={styles.bodycopy}>Couple up in the story of someone and use up to  5 words.</p>
          </div>
          <img className={styles.role_image} src="/assets/img/ROLES/lovestruck.svg" alt="Who narrates when?" />
        </article>
        {/* <article className={styles.role_wrapper}>
          <div>
            <h3 className={styles.subtitle}>The chatterbox</h3>
            <p className={styles.bodycopy}>His expertise in talking can get you free meals and</p>
            <h4 className={styles.subtitle}>Clan Power:</h4>
            <p className={styles.bodycopy}>skip your turn (spin the weel)</p>
          </div>
          <img className={styles.role_image} src="/assets/img/ROLES/siesta.svg" alt="Who narrates when?"/>
        </article> */}


      </section>



    </div>
  ));
};

export default Manual;


