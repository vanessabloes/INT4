import React from "react";
import { useObserver } from "mobx-react-lite";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

import Loading from "../../components/Loading";
import Core from "../../components/Core";
import Challenge from "../../components/Challenge";

import { useStore } from "../../hooks";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";

// conditional over alle drie de elementen:
// core_loading, core_wheel, core_challenge
// setState in de button steken (per pagina) om de juiste componenten te laden, deze setState/setPage bijhouden in store
const AddStory = () => {

  const { coreStore } = useStore();
  return useObserver(() => (
    <>
      {coreStore.state === "loading" ?

        <div>
          <Loading />
          <button
            value="core"
            onClick={e => coreStore.setState(e.target.value)}>
            <TheePotFlow text="Start storytelling" />
          </button>
        </div>
        :

       
            <div>
              <div>
                <Core />
                <button>
                  <TheePotFlow text="Find your way back" />
                </button>
                <TheePotLink text="Add Story" linkTo={ROUTES.path} />
              </div>

              :

            <div>
                <Challenge />
                <TheePotLink text="We're back on track" linkTo={ROUTES.path} />
              </div>
            </div>}

    </>
  ));
};

AddStory.propTypes = {

};

export default AddStory;
