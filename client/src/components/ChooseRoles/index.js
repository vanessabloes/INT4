import React, { useState } from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import { STATES } from "../../consts";
import TheePotFlow from "../buttons/Algemeen/TheePotFlow";
import Mask from "../Mask";
import MaskSmall from "../MaskSmall";
import PageTitle from "../PageTitle/PageTitle";
import styles from "./ChooseRoles.module.css"
import {ROUTES} from "../../consts/index"
import BackToWorldButton from "../buttons/BackToWorld/BackToWorldButton";




const ChooseRoles = () => {
  const { uiStore, roleStore, launchFlowStore, clanMemberStore } = useStore()
  const [rolesChosen, setState] = useState(false);

  const linkRole = () => {
    // for (let index = 0; index < roleStore.uniqueRoles.length; index++) {
    //   for (let index2 = 0; index2 < uiStore.currentJourney.wayfarers.length; index2++) {
    //     uiStore.currentJourney.wayfarers[index].setRole(roleStore.uniqueRoles[index2]);
    //   }
    // }

    setState(true)
   
    const wayfarersToLinkRole = uiStore.currentJourney.wayfarers;
    wayfarersToLinkRole.forEach(setRole);

  }

  function setRole(wayfarer, index) {
    //console.log(index)
    //console.log(wayfarer)
    wayfarer.setRole(roleStore.uniqueRoles[index]);
  }



  const loadRoles = () => {  
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
  }
  
  let gradenWayferers = null;
  const countWayferers = uiStore.currentJourney.wayfarers.length;
  const arcWayferers = 360 / countWayferers;
  
  let gradenRoles = null;
  const countRoles = roleStore.uniqueRoles.length;
  const arcRoles = 360 / countRoles;

  loadRoles();


  return useObserver(() => (
    <>
    <div className={styles.pagewrapper}>
      <header className={styles.header}>
        <div className={styles.headerButton}>
          <BackToWorldButton linkTo={ROUTES.home} />
        </div>
        <div className={styles.progres}>
          <p className={styles.progresTitle}>Preparing the journey</p>
          <img className={styles.progresImg} src="assets/img/PROGRESS/2of3.svg" alt="Choose roles Select wayfarers" />
          <p className={styles.select}>Select wayfarers</p>
          <p className={styles.choose}>Choose roles</p>
          <p className={styles.explore}>Explore roles</p>
        </div>
        <div className={styles.headerTitle}>
          <PageTitle title={"Choose Roles"} subtext={"Click on a role to explore it’s power. Drag your avatar to a role"} />
        </div>
      </header>
      
        
      <div className={styles.wayferersRolesWrapper}>
        <ul className={styles.wayfarerList}>
          {uiStore.currentJourney.wayfarers.map(wayfarer => (
            gradenWayferers = (0 + (uiStore.currentJourney.wayfarers.indexOf(wayfarer) * arcWayferers)),
            
            <li className={styles.wayfarerListItem} 
              style={
                { transform: 
                  `rotate(${gradenWayferers}deg)
                  ${rolesChosen ? 
                    "translate(4rem, 25rem)" :
                    "translate(0rem, 15rem)"}`,
                    transition: `1s ease-in-out` 
                }} 
              key={wayfarer.id}
            >
              <MaskSmall clanMember={clanMemberStore.resolveClanMember(wayfarer.clanMemberId)}/>
            </li>
          ))} 
        </ul>

        <ul className={styles.rolerList}>
          {roleStore.uniqueRoles.map(role => (
            gradenRoles = (0 + (roleStore.uniqueRoles.indexOf(role) * arcRoles)),
    
            <li className={styles.roleListItem} 
              style={
                { transform: 
                  `rotate(${gradenRoles}deg) 
                  ${rolesChosen ?
                    "translate(-6rem, 25rem)" :
                    "translate(0rem, 30rem)"}` ,
                    transition: `1s ease-in-out`
                }} 
              key={role.id}
            >
              <img className={styles.roleImg} src={role.image} alt={role.name} />
              <p className={styles.roleName}>{role.roleName}</p>
            </li>
          ))}
        </ul>
        <div className={styles.LinkRoutton}>
          {rolesChosen ? 
            <TheePotFlow text={"Explore roles"} onClick={e => uiStore.setAddJourneyState(STATES.ADDJOURNEY_STATE_EXPLOREROLES)} /> :
            <button className={styles.chooseButton} onClick={linkRole}>
              <img className={styles.chooseButtonImg} src="/assets/img/BUTTONS/btnTheePotDubble.svg" alt="Linkrole" />
              <p className={styles.button_title }>Linkrole</p>
            </button>}
        </div>
      </div> 

      
      

    </div>
    </>

  ));
};

ChooseRoles.propTypes = {

};

export default ChooseRoles;
