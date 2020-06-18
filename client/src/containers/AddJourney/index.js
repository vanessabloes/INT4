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



const AddJourney = () => {
  const { uiStore, roleStore, clanStore, clanMemberStore } = useStore()
  console.log(clanMemberStore);
  if(uiStore.currentClan){
        console.log("current lcan")
  }else{
        console.log("no current clan")
        uiStore.setCurrentClan(clanStore.resolveClan("675a4afd-7810-4666-a90b-bdabee51b103"));
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


      
  <p>Dit is de current clan name: {uiStore.currentClan.name}</p>
  <ul>
          Dit zijn alle clanmembers in de current clan: 
          {uiStore.currentClan.clanMembers.map(clanMember => (     
                <li> {clanMember.name}</li>
          ))}
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
