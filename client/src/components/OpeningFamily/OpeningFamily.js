import React from "react";
import styles from "./OpeningFamily.module.css"
import PageTitle from "../PageTitle/PageTitle"
import TheePotFlow from "../buttons/Algemeen/TheePotFlow"




const SurrealWorld = () => {
  return (
    <>
      <div className={styles.title_wrapper}>
        <PageTitle title={"Your fam becomes your clan"} subtext={"Hier zou je iets kunnen zeggen over dat board game ding"}/>
        <p className={styles.subtitle}>Enter a world where</p>
      </div>
      <TheePotFlow text={"Next"}/>
    </>
  );
};

export default SurrealWorld;


