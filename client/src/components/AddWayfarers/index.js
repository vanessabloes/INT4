import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import AddMemberButton from "../buttons/AddMember/AddMemberButton";
import { ROUTES, STATES } from "../../consts";
import PageTitle from "../PageTitle/PageTitle";
import BackToWorldButton from "../buttons/BackToWorld/BackToWorldButton";
import styles from "./AddWayfarer.module.css";
import TheePotFlow from "../buttons/Algemeen/TheePotFlow";
import WayfarerModel from "../../models/WayfarerModel";
import { v4 } from 'uuid';
import Mask from "../Mask";
import AvatarToolCreate from "../AvatarToolCreate";
import MaskSmall from "../MaskSmall";

const AddWayfarers = () => {

  const { uiStore, wayfarerStore, clanStore } = useStore();

  if (uiStore.currentClan != undefined) {
    clanStore.loadClanMembers(uiStore.currentClan.id);
    //console.log("HET LUUUUUKT"); DIT IS OKE
  } else {
    //console.log("geen current clan defined!");
    console.log(uiStore.currentClan);
  }
  let teller = 0;
  const addWayfarer = (id, mask) => {
    
    console.log(teller);
    let w = new WayfarerModel({
      id: v4(), //OKEEE
      clanMemberId: id, // komt binnen als je zal klikken op je masker van je clanMember (toevoegen aan blauwe stukjes op zon) //OKE!
      journeyId: uiStore.currentJourney.id,
      store: wayfarerStore
    });

    w.setJourney(uiStore.currentJourney);


    const coords = ["50rem, 20rem", "10rem, 20rem"]
     switch (mask.getBoundingClientRect().x) {
      case 203.984375: return mask.style.transform = `translate(${coords[teller]})`; break;
    
       default:
         break;
     }
    console.log(mask.getBoundingClientRect().x);
    
    console.log(w);
    teller++;

    //w.create(); DIT WERKT, maar moet pas in laatste stap wanner je op set journey klikt

  }


  const showOverlay = () => {
    uiStore.setVisibilityCreate(true);
  }

  return useObserver(() => (
    <>

  <div className={styles.pagewrapper}>
    <header className={styles.header}>
      <div className={styles.headerButton}>
        <BackToWorldButton linkTo={ROUTES.home} />
      </div>
      <div className={styles.progres}>
        <p className={styles.progresTitle}>Preparing the journey</p>
        <img className={styles.progresImg} src="assets/img/PROGRESS/1of3.svg" alt="Preparing the journey: Select wayfarers" />
        <p className={styles.select}>Select wayfarers</p>
        <p className={styles.choose}>Choose roles</p>
        <p className={styles.explore}>Explore roles</p>
      </div>
      <div className={styles.headerTitle}>
        <PageTitle title={"Your Roles"} subtext={"select the wayfarers of the journey"} />
      </div>
    </header>



     
      <div className={styles.membersWrapper}>
        <ul className={styles.membersList}>

          {uiStore.currentClan ? uiStore.currentClan.clanMembers.map(clanMember => ( 
            
            <li className={styles.memberListItem} key={clanMember.id}>
              <button className={styles.button} onClick={(e) => addWayfarer(clanMember.id, e.currentTarget)}>
                <MaskSmall clanMember={clanMember} />
              </button>
            </li>
          
          )) : "loading"}

        </ul>
        <AddMemberButton text={"Add member"} onClick={showOverlay} />
      </div>





      <div className={styles.imagesContainer}>
        <img className={styles.rotation} src="assets/img/PREPARING/behindsun_moving.svg" />
        <img className={styles.static} src="assets/img/PREPARING/sun_static.svg" />
        <img className={styles.roles} src="assets/img/PREPARING/sun_rollen1.svg" />
      </div>
      <div className={styles.buttonNext}>
        <TheePotFlow text={"Choose roles"} onClick={e => uiStore.setAddJourneyState(STATES.ADDJOURNEY_STATE_CHOOSEROLES)} />
        {uiStore.visibilityCreate ? <AvatarToolCreate /> : ""}
      </div>
  </div>
    </>
  ));
};

export default AddWayfarers;


