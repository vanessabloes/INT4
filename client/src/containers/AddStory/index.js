import React from "react";
import { useObserver } from "mobx-react-lite";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

import Loading from "../../components/Loading";
import Core from "../../components/Core";
import Challenge from "../../components/Challenge";
import { useStore } from "../../hooks";
import { STATES } from "../../consts";

const AddStory = () => {

  const { uiStore} = useStore();

  return useObserver(() => {

    if (uiStore.addStoryState === STATES.ADDSTORY_STATE_LOADING) {
      return <Loading />
    }

    if (uiStore.addStoryState === STATES.ADDSTORY_STATE_CORE) {
      return <><Core /></>
    }

    if (uiStore.addStoryState === STATES.ADDSTORY_STATE_CHALLENGE) {
      return <Challenge />;
    }

    return(
      <p>Loading..</p>
    )
  });
};

    AddStory.propTypes = {

    };

    export default AddStory;
