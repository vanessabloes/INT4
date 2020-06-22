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

  const addWayfarer = (id) => {
    console.log(id);
    let w = new WayfarerModel({
      id: v4(), //OKEEE
      clanMemberId: id, // komt binnen als je zal klikken op je masker van je clanMember (toevoegen aan blauwe stukjes op zon) //OKE!
      journeyId: uiStore.currentJourney.id,
      roleId: "1",
      store: wayfarerStore
    });

    w.setJourney(uiStore.currentJourney);

    console.log(w);

    //w.create(); DIT WERKT, maar moet pas in laatste stap wanner je op set journey klikt

  }


  const showOverlay = () => {
    uiStore.setVisibilityCreate(true);
  }

  return useObserver(() => (
    <>
      <div>
        <BackToWorldButton text={"dit is een test"} linkTo={ROUTES.home} />
        <div>
          <img src="assets/img/PROGRESS/1of3.svg" alt="" />
          <p>Select wayfarers</p>
          <p>Choose roles</p>
          <p>Explore roles</p>
        </div>
      </div>
      <PageTitle title={"Who joins the journey?"} subtext={"Select the wayfarers of the journey"} />
      <div>
        <ul className={styles.membersWrapper}>
          Dit zijn alle clanMembers van de current clan:

          {uiStore.currentClan ?
            uiStore.currentClan.clanMembers.map(clanMember => (
              <>
                <button onClick={() => addWayfarer(clanMember.id)} >{clanMember.name}</button>
                <Mask clanMember={clanMember} />
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


