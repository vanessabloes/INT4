import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import { STATES } from "../../consts";
import TheePotFlow from "../buttons/Algemeen/TheePotFlow";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Dustbin from "../Dustbin";
import Box from "../Box";

const ChooseRoles = () => {
  const { uiStore, roleStore, clanStore, clanMemberStore } = useStore()
 



  return useObserver (() => (
    <>
   <p>choose roles</p>
   <div className="App">
				<DndProvider backend={HTML5Backend}>
        <div>
    <div style={{ overflow: 'hidden', clear: 'both', margin: '-1rem' }}>
      <Dustbin greedy={true}>
        <Dustbin greedy={true}>
          <Dustbin greedy={true} />
        </Dustbin>
      </Dustbin>
      <Dustbin>
        <Dustbin>
          <Dustbin />
        </Dustbin>
      </Dustbin>
    </div>

    <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
      <Box />
    </div>
  </div>
				</DndProvider>
			</div>
   <TheePotFlow text={"Explore roles"} onClick={e => uiStore.setAddJourneyState(STATES.ADDJOURNEY_STATE_EXPLOREROLES)}/>

  </>

  
  ));
};

ChooseRoles.propTypes = {

};

export default ChooseRoles;
