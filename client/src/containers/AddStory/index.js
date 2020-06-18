import React from "react";
import { useObserver } from "mobx-react-lite";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

import Loading from "../../components/Loading";
import Coreflow from "../../components/Coreflow";
import { useStore } from "../../hooks";

// conditional over alle drie de elementen:
// core_loading, core_wheel, core_challenge
// setState in de button steken (per pagina) om de juiste componenten te laden, deze setState/setPage bijhouden in store

const AddStory = () => {

  const { coreStore } = useStore();
  console.log(coreStore.state);

  return useObserver(() => (
    <>
      {coreStore.state === "loading" ?
        <div>
          <Loading />
        </div>
        :
        <div>
          <Coreflow />
        </div>}
    </>
  ));
};

AddStory.propTypes = {

};

export default AddStory;
