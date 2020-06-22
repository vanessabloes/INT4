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
      <div>
        <BackToWorldButton linkTo={ROUTES.home} />
        <div className={styles.progres}>
          <p className={styles.progresTitle}>Preparing the journey</p>
          <img className={styles.progresImg} src="assets/img/PROGRESS/1of3.svg" alt="" />
          <p className={styles.select}>Select wayfarers</p>
          <p className={styles.choose}>Choose roles</p>
          <p className={styles.explore}>Explore roles</p>
        </div>
      </div>
      <PageTitle title={"Who joins the journey?"} subtext={"Select the wayfarers of the journey"} />
     
     
      <div>
        <ul className={styles.membersWrapper}>
          Dit zijn alle clanMembers van de current clan:

          {uiStore.currentClan ?
            uiStore.currentClan.clanMembers.map(clanMember => (
              <>
                <button onClick={(e) => addWayfarer(clanMember.id, e.currentTarget)} >
                  <p>{clanMember.name}</p>
                <Mask clanMember={clanMember} />
                </button>
                
              </>
            )) : "loading"}

        </ul>
        <AddMemberButton text={"Add member"} onClick={showOverlay} />
      </div>
      <div className={styles.container}>
        <img className={styles.rotation} src="assets/img/PREPARING/behindsun_moving.svg" />
        <img className={styles.static} src="assets/img/PREPARING/sun_static.svg" />
        <img className={styles.roles} src="assets/img/PREPARING/sun_rollen1.svg" />
      </div>
      <TheePotFlow text={"Choose roles"} onClick={e => uiStore.setAddJourneyState(STATES.ADDJOURNEY_STATE_CHOOSEROLES)} />
      {uiStore.visibilityCreate ? <AvatarToolCreate /> : ""}
    </>
  ));
};

export default AddWayfarers;


