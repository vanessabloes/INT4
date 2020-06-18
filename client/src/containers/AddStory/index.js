import React from "react";
import { useObserver } from "mobx-react-lite";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

import Loading from "../../components/Loading";
import Core from "../../components/Core";
import Challenge from "../../components/Challenge";


// conditional over alle drie de elementen:
// core_loading, core_wheel, core_challenge
// setState in de button steken (per pagina) om de juiste componenten te laden, deze setState/setPage bijhouden in store
const AddStory = () => {
  return useObserver(() => (
    <>
      <Loading />
      <Core />
      <Challenge />
    </>
  ));
};

AddStory.propTypes = {

};

export default AddStory;
