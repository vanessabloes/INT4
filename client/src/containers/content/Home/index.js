import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../../hooks";


const Home = () => {
  const { uiStore, clanMemberStore } = useStore()
  return (
    <>
   <p>hello world</p>

   <ul >
          
          {clanMemberStore.clanMembers.map(clanMember => ( 
                <p>{clanMember.clanId === uiStore.currentClan.id ? clanMember.name : " " }</p>

          
       
          ))}
  </ul>
  </>
  );
};

Home.propTypes = {

};

export default Home;
