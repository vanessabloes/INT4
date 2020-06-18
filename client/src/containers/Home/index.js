import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import ClanMemberStore from "../../stores/ClanMemberStore";


const Home = () => {
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
   <p>hello world</p>
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

  </>

  
  ));
};

Home.propTypes = {

};

export default Home;
