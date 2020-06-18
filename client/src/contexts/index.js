import { createContext } from "react";
import Store from "../stores";
import JourneyModel from "../models/JourneyModel";
import StoryModel from "../models/StoryModel";
import ClanMemberModel from "../models/ClanMemberModel";
import WayfarerModel from "../models/WayfarerModel";
import ClanModel from "../models/ClanModel";
import { v4 } from "uuid";
import WayfarerStore from "../stores/WayfarerStore";


const store = new Store();
window.store = store;

const loadAllData = async () => {
  const cl = new ClanModel({id: "675a4afd-7810-4666-a90b-bdabee51b103", name: "De Clan", password: "testing", store: store.clanStore});
       await store.clanStore.loadAllClans();
     // console.log(store.clanStore.loadAllClans())
   // await store.uiStore.login("De Clan", "testing");
   

    
      await store.roleStore.loadAllRoles();
      await store.definedWordStore.loadAllDefinedWords();
     // store.uiStore.login("De Clan", "testing");
    //cl.create();
    const cl2 = new ClanModel({id: v4(), name: "De Andere Clan", password: "testing", store: store.clanStore});
    //store.uiStore.setCurrentClan(cl);
    const c2 = new ClanMemberModel({id: v4(), name: "Tom", clanId: cl2.id, store: store.clanMemberStore});
    
    //const c = new ClanMemberModel({id: v4(), name: "Jos", clanId: cl.id, store: store.clanMemberStore});
    //c.create();
      await store.clanMemberStore.loadAllClanMembers();
      console.log(cl)
       await store.uiStore.setCurrentClan(cl)
       await console.log(store.uiStore.currentClan);
     // await store.uiStore.setCurrentClan(store.clanStore.resolveClan("675a4afd-7810-4666-a90b-bdabee51b103"));
      console.log(store.uiStore.currentClan.name)
      //await  store.uiStore.login("De Clan", "testing");
  
    //c2.create()
    const j = new JourneyModel({id: v4(), name: "journey 1", image: "assets/...", store: store.journeyStore});
   // j.create();
    const w = new WayfarerModel({id: v4(), clanMemberId: "8fbfb448-6823-46ca-ac66-8e1245610843", journeyId: "f732a075-98a5-443d-a695-3818574380fe", roleId: "1", store: store.wayfarerStore});
   // w.create();
   // const w2 = new WayfarerModel({id: v4(), clanId: cl2.id, clanMemberId: c2.id, journeyId:, store: store});
    
    store.uiStore.setCurrentJourney(j);
    
    const s = new StoryModel({id: v4(), name: "good story", journeyId: j.id, store: store.storyStore })
    
    //store.storyStore.updateStory(s);
}




loadAllData();
export const storeContext = createContext(store);
