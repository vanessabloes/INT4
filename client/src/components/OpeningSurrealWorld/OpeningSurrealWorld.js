import React from "react";
import styles from "./OpeningSurrealWorld.module.css"
import PageTitle from "../PageTitle/PageTitle"
import TheePotFlow from "../buttons/Algemeen/TheePotFlow"


const OpeningSurrealWorld = () => {
  return (
    <>
      <div className={styles.title_wrapper}>
        <PageTitle title={"A Surreal world"} subtext={"Where everyone challenges you to tell and achieve things you've never done before"}/>
        <p className={styles.subtitle}>And uncover as clan</p> 
      </div>
      <TheePotFlow text={"Next"}/>
    </>
  );
};

export default OpeningSurrealWorld;


