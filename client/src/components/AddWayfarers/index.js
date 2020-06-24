import React, { useState, useEffect } from "react";
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
import AvatarToolCreate from "../AvatarToolCreate";
import MaskSmall from "../MaskSmall";

const AddWayfarers = () => {

  const { uiStore, wayfarerStore, clanStore, clanMemberStore } = useStore();

  if (uiStore.currentClan !== undefined) {
    clanStore.loadClanMembers(uiStore.currentClan.id);

  } else {
    //console.log("geen current clan defined!");
    console.log(uiStore.currentClan);
  }

  const [data, setData] = useState();
  let teller = 1;

  useEffect(() => {
    localStorage.setItem("wayfarers", data);
  });

  const addWayfarer = (id, mask) => {

    setData({ id: JSON.stringify(id) })

    console.log(teller);
    let w = new WayfarerModel({
      id: v4(), //OKEEE
      clanMemberId: id, // komt binnen als je zal klikken op je masker van je clanMember (toevoegen aan blauwe stukjes op zon) //OKE!
      // journeyId: uiStore.currentJourney.id,
      store: wayfarerStore,
      topMaskId: clanMemberStore.resolveClanMember(id).topMaskId,
      middleMaskId: clanMemberStore.resolveClanMember(id).middleMaskId,
      bottomMaskId: clanMemberStore.resolveClanMember(id).bottomMaskId,
      name: clanMemberStore.resolveClanMember(id).name
    });

    console.log(w);

    w.setJourney(uiStore.currentJourney);
    console.log(mask.getBoundingClientRect().x);

    switch (mask.getBoundingClientRect().x) {
      case 95: teller++; return mask.style.transform = `translate(58rem, 12rem) rotate(220deg)`, mask.style.transition = `1s ease-in-out`;
      case 630.0296630859375: teller++; return mask.style.transform = `translate(0) rotate(0deg)`, mask.style.transition = `1s ease-in-out`;

      case 190: teller++; return mask.style.transform = `translate(51rem, 39.5rem) rotate(-70deg)`, mask.style.transition = `1s ease-in-out`;
      case 649.265869140625: teller++; return mask.style.transform = `translate(0) rotate(0deg)`, mask.style.transition = `1s ease-in-out`;

      case 285: teller++; return mask.style.transform = `translate(40rem, 55rem) rotate(-50deg)`, mask.style.transition = `1s ease-in-out`;
      case 635.1301879882812: teller++; return mask.style.transform = `translate(0) rotate(0deg)`, mask.style.transition = `1s ease-in-out`;

      case 380: teller++; return mask.style.transform = `translate(-28rem, 56rem) rotate(50deg)`, mask.style.transition = `1s ease-in-out`;
      case 50.130210876464844: teller++; return mask.style.transform = `translate(0) rotate(0deg)`, mask.style.transition = `1s ease-in-out`;

      case 475: teller++; return mask.style.transform = `translate(-43rem, 28rem) rotate(130deg)`, mask.style.transition = `1s ease-in-out`;
      case -4.869789123535156: teller++; return mask.style.transform = `translate(0) rotate(0deg)`, mask.style.transition = `1s ease-in-out`;

      case 570: teller++; return mask.style.transform = `translate(-44rem, 12rem) rotate(155deg)`, mask.style.transition = `1s ease-in-out`;
      case 97.57693481445312: teller++; return mask.style.transform = `translate(0) rotate(0deg)`, mask.style.transition = `1s ease-in-out`;

      default:
        break;
    }

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
            <PageTitle title={"Your Roles"} subtext={"Click on the wayfarers who will join the journey:"} />
          </div>
        </header>

        <div className={styles.membersWrapper}>
          <ul className={styles.membersList}>

            {uiStore.currentClan ? uiStore.currentClan.clanMembers.map(clanMember => (

              <li className={styles.memberListItem} onClick={(e) => addWayfarer(clanMember.id, e.currentTarget)} key={clanMember.id}>

                <MaskSmall clanMember={clanMember} />
              </li>

            )) : "loading"}

          </ul>
          <AddMemberButton text={"Add member"} onClick={showOverlay} />
        </div>





        <div className={styles.imagesContainer}>
          <img className={styles.rotation} src="assets/img/PREPARING/behindsun_moving.svg" alt={"tentakels"} />
          <img className={styles.static} src="assets/img/PREPARING/sun_static.svg" alt={"zon"} />
          <img className={styles.roles} src="assets/img/PREPARING/sun_rollen1.svg" alt={"zonnestralen"} />
        </div>
        <div className={styles.buttonNext}>
          {uiStore.currentJourney.wayfarers.length > 0 ? <TheePotFlow text={"Choose roles"} onClick={e => uiStore.setAddJourneyState(STATES.ADDJOURNEY_STATE_CHOOSEROLES)} /> : ""}
          {uiStore.visibilityCreate ? <AvatarToolCreate /> : ""}
        </div>
      </div>
    </>
  ));
};

export default AddWayfarers;


