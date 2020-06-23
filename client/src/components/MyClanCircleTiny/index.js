import React from "react";
import styles from "./MyClanCircleTiny.module.css"
import { useStore } from "../../hooks";
import MyClanButton from "../buttons/MyClan"
import AddMemberButton from "../buttons/AddMember/AddMemberButton"
import { useObserver } from "mobx-react-lite";
import MaskMedium from "../MaskMedium";


const MyClanCircleTiny = ({ page }) => { //centerButton -> MyClanCircle anders is het addMember


  const { uiStore, clanStore, clanMemberStore } = useStore();
  clanStore.loadClanMembers(uiStore.currentClan.id);
  const countClanMembers = uiStore.currentClan.clanMembers.length;
  const arc = 360 / countClanMembers;

  let graden = null;

  const showOverlay = (topMaskId, middleMaskId, bottomMaskId, name, age, id) => {
    uiStore.setName(name);
    uiStore.setAge(age);
    uiStore.setTopCount(topMaskId);
    uiStore.setMiddleCount(middleMaskId);
    uiStore.setBottomCount(bottomMaskId);
    uiStore.setVisibilityUpdate(true);
    uiStore.setSelectedClanMember(id);
  }


  const handleDeleteAvatar = clanMember => {
    clanMemberStore.deleteClanMember(clanMember);
    //clanMember.delete();
  }

  return useObserver(() => (

    <div className={styles.circle_wrapper}>
      {
        uiStore.currentClan.clanMembers.map(clanMember => (
          graden = (0 + (uiStore.currentClan.clanMembers.indexOf(clanMember) * arc)),
          <div className={styles.mask_element} style={{ transform: `rotate(${graden}deg) translate(0rem, 18rem)`,transition: `1s ease-in-out` }} key={clanMember.id}>


            <div className={styles.mask_image}>
              <MaskMedium clanMember={clanMember} />
            </div>

            {page === "/" ? "" : <button className={styles.buttonEdit} onClick={() => showOverlay(clanMember.topMaskId, clanMember.middleMaskId, clanMember.bottomMaskId, clanMember.name, clanMember.age, clanMember.id)}><span className={styles.hidden}>Edit</span></button>}
            {page === "/" ? "" : <button className={styles.buttonDelete} onClick={() => handleDeleteAvatar(clanMember)}><span className={styles.hidden}>Delete</span></button>}

          </div>

        ))
      }
      {
        page === "/" ? <MyClanButton /> : <AddMemberButton text={"Add Member"} />  // linkTo={}
      }


    </div>
  )
  )
}

export default MyClanCircleTiny;
