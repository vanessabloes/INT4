import { createContext } from "react";
import Store from "../stores";
import JourneyModel from "../models/JourneyModel";
import StoryModel from "../models/StoryModel";
import ClanMemberModel from "../models/ClanMemberModel";
import WayfarerModel from "../models/WayfarerModel";


const store = new Store();
window.store = store;
store.roleStore.loadAllRoles();
store.definedWordStore.loadAllDefinedWords();


const c = new ClanMemberModel({id: 1, name: "Jos", store: store.clanMemberStore});
const j = new JourneyModel({id: 1, name: "journey 1", store: store.journeyStore});
const w = new WayfarerModel({id: 1, clanMemberId: 1, journeyId: 1, store: store});
// get all defined words 

// get all defined words from current journey via all defined words in story

// check and add some to story, then update story to server 
store.uiStore.setCurrentJourney(j);
//const definedWords = store.uiStore.currentJourney.definedWords;
//
//let storyDefinedWords = [];
//if(definedWords.length === 0){
//    console.log("do not check them");
//    storyDefinedWords = ["elephant", "honey", "pan"];
//}else{
//    console.log("check them");
//}
const s = new StoryModel({id: 1, name: "good story", journeyId: 1, store: store.storyStore })

store.storyStore.updateStory(s);




//store.loadAllData();
export const storeContext = createContext(store);
