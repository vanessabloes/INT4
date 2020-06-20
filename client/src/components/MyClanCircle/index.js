import React from "react";
import styles from "./MyClanCircle.module.css"
import { useStore } from "../../hooks";
import MyClanButton from "../buttons/MyClan"
import AddMemberButton from "../buttons/AddMember/AddMemberButton"
import { useObserver } from "mobx-react-lite";
import Mask from "../Mask";
import AvatarTool from "../AvatarTool";







const MyClanCircle = ({ page }) => { //centerButton -> MyClanCircle anders is het addMember


  const { uiStore, clanStore, topMaskStore, middleMaskStore, bottomMaskStore } = useStore();
  clanStore.loadClanMembers(uiStore.currentClan.id);
  const countClanMembers = uiStore.currentClan.clanMembers.length;
  const arc = 360 / countClanMembers;
  
  let graden = null;

  const showOverlay = (topMaskId, middleMaskId, bottomMaskId, name, age) => {
    uiStore.setName(name);
    uiStore.setAge(age);
    uiStore.setTopCount(topMaskId);
    uiStore.setMiddleCount(middleMaskId);
    uiStore.setBottomCount(bottomMaskId);
    uiStore.setVisibility(true);
  }
  return useObserver (() => (

    <div className={styles.masks_wrapper}>
    {
      uiStore.currentClan.clanMembers.map(clanMember => (
        
        graden = (0 + (uiStore.currentClan.clanMembers.indexOf(clanMember) * arc)),
          
          <div className={styles.mask_element} key={clanMember.id}>
            <div style={{ transform: `rotate(${graden}deg) translate(0rem, 16rem)`}} className={styles.mask}>
              <div className={styles.mask_image}>
               
                  <Mask clanMember={clanMember}/>
       
              </div>
              { 
     page === "/" ? "" : <div><button onClick={() => showOverlay(clanMember.topMaskId, clanMember.middleMaskId, clanMember.bottomMaskId, clanMember.name, clanMember.age)}>Edit</button></div>
    }
            </div>
          </div>
       
      ))
    }
    { 
     page === "/" ? <MyClanButton/> : <AddMemberButton text={"Add another Member"}  />  // linkTo={}
    }
    
    
    </div>
  )
  )
  }
  
  export default MyClanCircle;
