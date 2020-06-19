import React from "react";
import styles from "./MyClan.module.css"
import { useStore } from "../../hooks";
import MyClanButton from "../buttons/MyClan/MyclanButton"
import AddMemberButton from "../buttons/AddMember/AddMemberButton"
import { useObserver } from "mobx-react-lite";




const MyClan = ({centerButton, clan}) => {
  
  const countClanMembers = clan.length;
  const arc = 360 / countClanMembers;
  
  let graden = null;
  const { launchFlowStore } = useStore()

  
  
  return (
    <ul className={styles.masks_wrapper}>
      {
        clan.map(clanMember => (
          graden = (0 + (clan.indexOf(clanMember) * arc)),

          <li  className={styles.mask_element} key={clanMember.id}>
            {console.log("tis ieer",clanMember.name),console.log(graden)}

            <div style={{ transform: `rotate(${graden}deg) translate(0rem, 16rem)`}} className={styles.mask}>
              <img className={styles.mask_image}  src={clanMember.avatar} alt={clanMember.name} />
              <p>{clanMember.name}</p>
            </div>
            
          </li>
        ))
      }
    </ul>
    
 
    
        // if(centerButton === "AddMember") {
        //   return <AddMemberButton text={"Add another Member"}/>
        // }

        // if(centerButton === "MyClan") {
        //   return <MyClanButton/>
        // }
    
   

    
    

        );
};

export default MyClan;


