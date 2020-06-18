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

configure({ enforceActions: `observed` });

class Store {
  constructor() {
 
    this.clanStore = new ClanStore(this);
    this.uiStore = new UiStore(this);
    this.clanMemberStore = new ClanMemberStore(this);
   
    this.journeyStore = new JourneyStore(this);
    this.wayfarerStore = new WayfarerStore(this);
    this.storyStore = new StoryStore(this);


    this.roleStore = new RoleStore(this);
    this.definedWordStore = new DefinedWordStore(this);
    this.definedStoryWordStore = new DefinedStoryWordStore(this);
<<<<<<< HEAD
    //this.categoryStore = new CategoryStore(this);
    //this.drinkStore = new DrinkStore(this);


    this.launchFlowStore = new LaunchFlowStore(this)
    //pepijn: LaunchFlowStore -> om state van de launch shermen bijhouden
  }
=======
>>>>>>> 3b3bf78977f75b31b315a67c6f2da2052707b91d


    this.wordStore = new WordStore(this);
    this.coreStore = new CoreStore(this);
  }
}
export default Store;