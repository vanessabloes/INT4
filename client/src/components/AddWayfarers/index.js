import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import AddMemberButton from "../buttons/AddMember/AddMemberButton";
import { ROUTES } from "../../consts";
import PageTitle from "../PageTitle/PageTitle";
import BackToWorldButton from "../buttons/BackToWorld/BackToWorldButton";
import  style  from "./AddWayfarer.module.css";

const AddWayfarers = () => {
const { uiStore } = useStore();
  return useObserver(() => (
      <>
        <div> 
        <BackToWorldButton text={"dit is een test"} linkTo={ROUTES.home}/>
        <div>
          <img src="assets/img/PROGRESS/1of3.svg" alt=""/>
          <p>Select wayfarers</p>
          <p>Choose roles</p>
          <p>Explore roles</p>
        </div>
    </div>
    <PageTitle title={"Who joins the journey?"} subtext={"Select the wayfarers of the journey"}/>
    <div>
    <ul>
    Dit zijn alle clanMembers van de current clan: 
    {uiStore.currentClan ? 
    uiStore.currentClan.clanMembers.map(clanMember => (     
                    <li>{clanMember.name}</li>
              )) : "loading"}         
    
    </ul>
    <AddMemberButton text={"Add"} linkTo={ROUTES.home}/>
    </div>
    <div className={style.container}>
  <img className={style.rotation} src="assets/img/PREPARING/behindsun_moving.svg"/>
  <img className={style.static} src="assets/img/PREPARING/sun_static.svg"/>
  <img className={style.roles} src="assets/img/PREPARING/sun_rollen1.svg"/>
  </div> 
</>
  ));
};

export default AddWayfarers;

