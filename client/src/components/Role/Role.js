import React from "react";
import styles from "./Role.module.css"


const Role = () => {
  return (
    <article className={styles.role_wrapper}>
      <div>
        <h3 className={styles.subtitle}>The lovestrucked</h3>
        <p className={styles.bodycopy_italic}>Always gets himself in a vacation love.</p>
        <p className={styles.bodycopy}>He cant survive a vacation on his own and falls in love very easily. </p>
        <h4 className={styles.subtitle}>Clan Power:</h4>
        <p className={styles.bodycopy}>Couple up in the story of someone and use up to  5 words.</p>
      </div>
      <img className={styles.role_image} src="assets/img/ROLES/lovestruck.svg" alt="Who narrates when?"/>
    </article>
  );
};

export default Role;


