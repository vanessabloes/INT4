import { createContext } from "react";
import Store from "../stores";
import JourneyModel from "../models/JourneyModel";
import StoryModel from "../models/StoryModel";
import ClanMemberModel from "../models/ClanMemberModel";
import WayfarerModel from "../models/WayfarerModel";
import ClanModel from "../models/ClanModel";
import { v4 } from "uuid";



const store = new Store();
window.store = store;

const loadAllData = async () => {
  //const cl = new ClanModel({id: "675a4afd-7810-4666-a90b-bdabee51b103", name: "De Clan", password: "testing", store: store.clanStore});
      await store.clanStore.loadAllClans();
      await store.roleStore.loadAllRoles();
      await store.definedWordStore.loadAllDefinedWords();


      await store.clanMemberStore.loadAllClanMembers();
      await store.journeyStore.loadAllJourneys();

      await store.uiStore.setCurrentClan(store.clanStore.resolveClan("675a4afd-7810-4666-a90b-bdabee51b103"));
      await store.uiStore.setCurrentJourney(store.journeyStore.resolveJourney("f732a075-98a5-443d-a695-3818574380fe"));

    const cl2 = new ClanModel({id: v4(), name: "De Andere Clan", password: "testing", store: store.clanStore});
    const c2 = new ClanMemberModel({id: v4(), name: "Tom", clanId: cl2.id, store: store.clanMemberStore});
    
     


}




loadAllData();
export const storeContext = createContext(store);
