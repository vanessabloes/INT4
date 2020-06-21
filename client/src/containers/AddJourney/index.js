import React, { useState } from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow"

import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import { v4 } from "uuid";
import WayfarerModel from "../../models/WayfarerModel";
import AddWayfarers from "../../components/AddWayfarers";
import ChooseRoles from "../../components/ChooseRoles";
import ExploreRoles from "../../components/ExploreRoles/ExploreRoles";

import { STATES } from "../../consts";
import Loading from "../../components/Loading";

const AddJourney = () => {
  const { uiStore, roleStore, clanStore, clanMemberStore, journeyStore, wayfarerStore } = useStore();


  const addWayfarer = (e) => {
    e.preventDefault();

    const w = new WayfarerModel({
      id: v4(), 
      clanMemberId: "8fbfb448-6823-46ca-ac66-8e1245610843",
      journeyId: uiStore.currentJourney.id,
      roleId: "1", 
      store: wayfarerStore
    });

   //  w.create();
  
  }

  const changeState = stateCount => {
    uiStore.setState(stateCount);
  }
 

  const [addWayfarerState, setState] = useState();
  
  return useObserver (() => {

    if (uiStore.addJourneyState === STATES.ADDJOURNEY_STATE_ADDWAYFARERS) {
      return <AddWayfarers onClick={setState}/> 
    }
    
    if(uiStore.addJourneyState === STATES.ADDJOURNEY_STATE_CHOOSEROLES) {
      return <ChooseRoles />
    }

    if (uiStore.addJourneyState === STATES.ADDJOURNEY_STATE_EXPLOREROLES) {
      return <ExploreRoles />;
    }
    return (
    <>
   <p>AddJourney</p>

   <ul >
          Dit zijn alle clans uit de db: 
          {clanStore.clans.map(clan  => (     
                <li>{clan.name}</li>
          ))}
  </ul>

  <ul >
          Dit zijn alle journeys uit de db: 
          {journeyStore.journeys.map(journey  => (     
                <li>{journey.name}</li>
          ))}
  </ul>
 
  <ul >
          Dit zijn alle role names uit de db: 
          {roleStore.roles.map(role => (     
                <li>{role.roleName}</li>
          ))}
  </ul>
  <ul>
          
          {clanMemberStore.clanMembers.map(clanMember => (     
                <li>Dit zijn alle clanMembers: {clanMember.name}</li>
          ))}
  </ul>
<button onClick={addWayfarer}>Add wayfarer</button>

      
  <p>Dit is de current clan name: {uiStore.currentClan ? uiStore.currentClan.name : "loading"}</p>
  <p>Dit is de current journey name:{uiStore.currentJourney ? uiStore.currentJourney.name : "loading"}</p>

  

<ul>
Dit zijn alle clanMembers van de current clan: 
{uiStore.currentClan ? 
uiStore.currentClan.clanMembers.map(clanMember => (     
                <li>{clanMember.name}</li>
          )) : "loading"}         

</ul>

    


  <AddWayfarers/>
  <ChooseRoles/>
  <ExploreRoles/>
  
  <TheePotFlow text={"Choose roles"} onClick={changeState(2)}/>


  </>
    );
      
  });
};

AddJourney.propTypes = {

};

export default AddJourney;
