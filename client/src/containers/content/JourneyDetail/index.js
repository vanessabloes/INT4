import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
//import PropTypes from "prop-types";


const JourneyDetail = () => {
  return (
    <>
      <p>journey detail? = Journey overview?</p>
      <Link to={ROUTES.addStory}>
        Add New Story
      </Link>
    </>

  );
};

JourneyDetail.propTypes = {

};

export default JourneyDetail;
