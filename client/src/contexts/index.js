import { createContext } from "react";
import Store from "../stores";
import JourneyModel from "../models/JourneyModel";
import StoryModel from "../models/StoryModel";
import ClanMemberModel from "../models/ClanMemberModel";
import WayfarerModel from "../models/WayfarerModel";
import ClanModel from "../models/ClanModel";


const store = new Store();
window.store = store;
store.roleStore.loadAllRoles();
store.definedWordStore.loadAllDefinedWords();

const cl = new ClanModel({id: 1, name: "De Clan", password: "testing", store: store.clanStore});
const cl2 = new ClanModel({id: 2, name: "De Andere Clan", password: "testing", store: store.clanStore});
store.uiStore.login("De Clan", "testing")


const c = new ClanMemberModel({id: 1, name: "Jos", clanId: 1, store: store.clanMemberStore});
const c2 = new ClanMemberModel({id: 2, name: "Tom", clanId: 2, store: store.clanMemberStore});
const j = new JourneyModel({id: 1, name: "journey 1", store: store.journeyStore});
const w = new WayfarerModel({id: 1, clanId: 1, clanMemberId: 1, journeyId: 1, store: store});
const w2 = new WayfarerModel({id: 1, clanId: 2, clanMemberId: 2, journeyId: 2, store: store});

store.uiStore.setCurrentJourney(j);

const s = new StoryModel({id: 1, name: "good story", journeyId: 1, store: store.storyStore })

store.storyStore.updateStory(s);




//store.loadAllData();
export const storeContext = createContext(store);
