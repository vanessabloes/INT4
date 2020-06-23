import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import BackToJourney from "../../components/buttons/BackToJourney/BackToJourney"
import Styles from "./StoryDetail.module.css"

const StoryDetail = () => {
  return (
    <>
    <header className={Styles.header}>
      <BackToJourney />
      <PageTitle title={"story 1"} subtext={"These are the words that heve been said in story one."}/>
    </header>
    </>
  );
};

StoryDetail.propTypes = {

};

export default StoryDetail;
