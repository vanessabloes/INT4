import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import AddMemberButton from "../buttons/AddMember/AddMemberButton";
import { ROUTES } from "../../consts";


const AddWayfarers = () => {
const { uiStore } = useStore();
  return useObserver(() => (
      
   
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

  ));
};

export default AddWayfarers;


