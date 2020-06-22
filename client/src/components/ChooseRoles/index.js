import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import { STATES } from "../../consts";
import TheePotFlow from "../buttons/Algemeen/TheePotFlow";
import Mask from "../Mask";
import PageTitle from "../PageTitle/PageTitle";
import styles from "./ChooseRoles.module.css"
import {ROUTES} from "../../consts/index"
import BackToWorldButton from "../buttons/BackToWorld/BackToWorldButton";




const ChooseRoles = () => {
  const { uiStore, roleStore, clanStore, clanMemberStore } = useStore()

  const linkRole = () => {
    // for (let index = 0; index < roleStore.uniqueRoles.length; index++) {
    //   for (let index2 = 0; index2 < uiStore.currentJourney.wayfarers.length; index2++) {
    //     uiStore.currentJourney.wayfarers[index].setRole(roleStore.uniqueRoles[index2]);
    //   }
      
    // }
    // console.log(roleStore.uniqueRoles)
    // console.log(uiStore.currentJourney.wayfarers)
    // console.log(uiStore.currentJourney.wayfarers[0].setRole(roleStore.uniqueRoles[0]));
    const wayfarersToLinkRole = uiStore.currentJourney.wayfarers;
    console.log(wayfarersToLinkRole)
    wayfarersToLinkRole.forEach(setRole);


  }

  function setRole(wayfarer, index) {
    console.log(index)
    console.log(wayfarer)
    wayfarer.setRole(roleStore.uniqueRoles[index]);
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
      <div className={styles.progres}>
        <BackToWorldButton linkTo={ROUTES.home} />
        <p className={styles.progresTitle}>Preparing the journey</p>
        <img className={styles.progresImg} src="assets/img/PROGRESS/2of3.svg" alt="Choose roles Select wayfarers" />
        <p className={styles.select}>Select wayfarers</p>
        <p className={styles.choose}>Choose roles</p>
        <p className={styles.explore}>Explore roles</p>
        </div>
      <PageTitle title={"Choose Roles"} subtext={"Click on a role to explore it’s power. Drag your avatar to a role"} />
      {uiStore.currentJourney.wayfarers.map(wayfarer => (
  
        <Mask clanMember={clanMemberStore.resolveClanMember(wayfarer.clanMemberId)}/>
        
      ))}

<button onClick={linkRole}>Linkrole</button>
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
