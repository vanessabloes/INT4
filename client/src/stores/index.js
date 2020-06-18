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
import LaunchFlowStore from "./LaunchFlowStore";


configure({ enforceActions: `observed` });

class Store {
  constructor() {
    this.uiStore = new UiStore(this);
    this.clanStore = new ClanStore(this);

    this.clanMemberStore = new ClanMemberStore(this);
    this.wayfarerStore = new WayfarerStore(this);
    this.journeyStore = new JourneyStore(this);
    this.storyStore = new StoryStore(this);
 

    this.roleStore = new RoleStore(this);
    this.definedWordStore = new DefinedWordStore(this);
    this.definedStoryWordStore = new DefinedStoryWordStore(this);
    //this.categoryStore = new CategoryStore(this);
    //this.drinkStore = new DrinkStore(this);


    this.launchFlowStore = new LaunchFlowStore(this)
    //pepijn: LaunchFlowStore -> om state van de launch shermen bijhouden
  }



  loadAllData = async () => {
    //await this.categoryStore.loadAllCategories();
    //this.drinkStore.loadAllDrinks();
  };
}
export default Store;
