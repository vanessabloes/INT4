import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import { STATES } from "../../consts";
import TheePotFlow from "../buttons/Algemeen/TheePotFlow";


const ChooseRoles = () => {
  const { uiStore, roleStore, clanStore, clanMemberStore } = useStore()

  const linkRole = () => {

  }

  const loadRoles = () => {

    console.log("loaded")
    console.log(roleStore.roles[0]) // = roleModel
    console.log(roleStore.roles.length); // = 1
    console.log(roleStore.uniqueRoles.length) // = O

    console.log(uiStore.currentJourney.wayfarers.length);

    for (let index = 0; roleStore.uniqueRoles.length < uiStore.currentJourney.wayfarers.length; index++) {

      const randomRole = roleStore.roles[Math.floor(Math.random() * (roleStore.roles.length))];

      if (roleStore.uniqueRoles.length === 0) {
        roleStore.addUniqueRole(randomRole);
      } else {
        let counter = 0;
        roleStore.uniqueRoles.forEach(role => {
          if (role === randomRole) {
            console.log("same role..");
          } else {
            counter++;
            if (counter === roleStore.uniqueRoles.length) {
              roleStore.addUniqueRole(randomRole);
            }
          }
        })
      }

    }

    console.log(roleStore.uniqueRoles);

  }

  loadRoles();


  return useObserver(() => (
    <>
      <p>choose roles</p>

      {uiStore.currentJourney.wayfarers.map(wayfarer => (
        <>
        <div>
          <img src={clanMemberStore.resolveClanMember(wayfarer.clanMemberId).topMaskId} alt="top-mask"/>
          <img src={clanMemberStore.resolveClanMember(wayfarer.clanMemberId).middleMaskId} alt="middle-mask"/>
          <img src={clanMemberStore.resolveClanMember(wayfarer.clanMemberId).bottomMaskId} alt="bottom-mask"/>
        </div>
        <p>{clanMemberStore.resolveClanMember(wayfarer.clanMemberId).name}</p>
        <button onClick={linkRole}>Linkrole</button>
        </>
      ))}
{/* 
de op geklikte clanMember zn id checken

met de wayfarer.clanMemberId 

in de currentJourney

*/}
      {roleStore.uniqueRoles.map(role => (
        <p>{role.roleName}</p>
      ))}

      <TheePotFlow text={"Explore roles"} onClick={e => uiStore.setAddJourneyState(STATES.ADDJOURNEY_STATE_EXPLOREROLES)} />

    </>


  ));
};

ChooseRoles.propTypes = {

};

export default ChooseRoles;
