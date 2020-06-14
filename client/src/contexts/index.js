import { createContext } from "react";
import Store from "../stores";
import JourneyModel from "../models/JourneyModel";
import StoryModel from "../models/StoryModel";
import ClanMemberModel from "../models/ClanMemberModel";
import WayfarerModel from "../models/WayfarerModel";


const store = new Store();
window.store = store;
store.roleStore.loadAllRoles();

const c = new ClanMemberModel({id: 1, name: "Jos", store: store.clanMemberStore});
const j = new JourneyModel({id: 1, name: "journey 1", store: store.journeyStore});
const w = new WayfarerModel({id: 1, clanMemberId: 1, journeyId: 1, store: store});

const s = new StoryModel({id: 1, name: "good story", journeyId: 1, store: store.storyStore })

store.storyStore.updateStory(s);

//store.loadAllData();
export const storeContext = createContext(store);
