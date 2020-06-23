import { configure } from "mobx";
import JourneyStore from "./JourneyStore";
import ClanMemberStore from "./ClanMemberStore";
import RoleStore from "./RoleStore";
import StoryStore from "./StoryStore";
import UiStore from "./UiStore";
import DefinedWordStore from "./DefinedWordStore";
import DefinedStoryWordStore from "./DefinedStoryWordStore";
import ClanStore from "./ClanStore";
import WayfarerStore from "./WayfarerStore";
import WordStore from "./WordStore";
import CoreStore from "./CoreStore";
import LaunchFlowStore from "./LaunchFlowStore";
import TopMaskStore from "./TopMaskStore";
import MiddleMaskStore from "./MiddleMaskStore";
import BottomMaskStore from "./BottomMaskStore";
import ChallengeStore from "./ChallengeStore";

configure({ enforceActions: `observed` });

class Store {
  constructor() {

    this.clanStore = new ClanStore(this);
    this.uiStore = new UiStore(this);
    this.clanMemberStore = new ClanMemberStore(this);
    this.topMaskStore = new TopMaskStore(this);
    this.middleMaskStore = new MiddleMaskStore(this);
    this.bottomMaskStore = new BottomMaskStore(this);
    this.journeyStore = new JourneyStore(this);
    this.wayfarerStore = new WayfarerStore(this);
    this.storyStore = new StoryStore(this);
    this.roleStore = new RoleStore(this);
    this.definedWordStore = new DefinedWordStore(this);
    this.definedStoryWordStore = new DefinedStoryWordStore(this);
    this.challengeStore = new ChallengeStore(this);

    this.launchFlowStore = new LaunchFlowStore(this);


    this.wordStore = new WordStore(this);
    this.coreStore = new CoreStore(this);
  }
}
export default Store;