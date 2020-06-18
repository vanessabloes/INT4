import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

import PageTitle from "../../components/PageTitle/PageTitle"

import AddMemberButton from "../../components/buttons/AddMember/AddMemberButton"
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow"
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink"
import StartJourneyButton from "../../components/buttons/StartJourney/StartJourneyButton"
import MyclanButton from "../../components/buttons/MyClan/MyclanButton"
import BackToWorldButton from "../../components/buttons/BackToWorld/BackToWorldButton"
import { ROUTES } from "../../consts"
import ClanMemberStore from "../../stores/ClanMemberStore";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import { v4 } from "uuid";
import WayfarerModel from "../../models/WayfarerModel";



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

 

  
  return useObserver (() => (

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

    
    
    <PageTitle title={"Who joins the journey?"} subtext={"dit is een zin voor in de subtext veel plezier ermee"}/>

  
  <AddMemberButton text={"Add"} linkTo={ROUTES.home}/>
  <BackToWorldButton text={"dit is een test"} linkTo={ROUTES.home}/>
  <TheePotLink text={"dit is een test"} linkTo={ROUTES.home}/>
  <MyclanButton/>
  <StartJourneyButton/>
  </>
  ));
};

AddJourney.propTypes = {

};

export default AddJourney;
