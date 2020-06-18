import React from "react";
import { useObserver } from "mobx-react-lite";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

import Loading from "../../../components/Loading";
import Core from "../../../components/Core";
import Challenge from "../../../components/Challenge";


const AddStory = () => {
  return useObserver(() => (
    <>
      <p>AddStory</p>
      <Loading />
      <Core />
      <Challenge />
    </>
  ));
};

AddStory.propTypes = {

};

export default AddStory;
