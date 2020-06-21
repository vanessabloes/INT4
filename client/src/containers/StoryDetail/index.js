import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import BackToJourney from "../../components/buttons/BackToJourney/BackToJourney"


const StoryDetail = () => {
  return (
    <>
      <BackToJourney />
      <PageTitle title={"story 1"} subtext={"These are the words that heve been said in story one."}/>
    
    </>
  );
};

StoryDetail.propTypes = {

};

export default StoryDetail;
