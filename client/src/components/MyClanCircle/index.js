import React from "react";
import styles from "./MyClanCircle.module.css"
import { useStore } from "../../hooks";
import MyClanButton from "../buttons/MyClan"
import AddMemberButton from "../buttons/AddMember/AddMemberButton"
import { useObserver } from "mobx-react-lite";




const MyClanCircle = ({clan, page}) => { //centerButton -> MyClanCircle anders is het addMember
  
  const countClanMembers = clan.length;
  const arc = 360 / countClanMembers;
  
  let graden = null;
  const { launchFlowStore } = useStore()

  return (
  
    <div className={styles.masks_wrapper}>
    {
      clan.map(clanMember => (
        graden = (0 + (clan.indexOf(clanMember) * arc)),

        <div  className={styles.mask_element} key={clanMember.id}>
          {console.log("tis ieer",clanMember.name),console.log(graden)}

          <div style={{ transform: `rotate(${graden}deg) translate(0rem, 16rem)`}} className={styles.mask}>
            <img className={styles.mask_image}  src={clanMember.avatar} alt={clanMember.name} />
            <p className={styles.mask_name}>{clanMember.name}</p>
          </div>
         
        </div>
      ))
    }
    { 
     page === "/" ? <MyClanButton/> : <AddMemberButton text={"Add another Member"}  />  // linkTo={}
    }
    
    
    </div>
  )
  }
  
  export default MyClanCircle;
