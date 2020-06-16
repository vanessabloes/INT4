import { configure } from "mobx";
import JourneyStore from "./JourneyStore";
import ClanMemberStore from "./ClanMemberStore";
import RoleStore from "./RoleStore";
import StoryStore from "./StoryStore";
import UiStore from "./UiStore";
import DefinedWordStore from "./DefinedWordStore";
import DefinedStoryWordStore from "./DefinedStoryWordStore";

configure({ enforceActions: `observed` });

class Store {
  constructor() {
    this.clanMemberStore = new ClanMemberStore(this);
    this.journeyStore = new JourneyStore(this);
    this.roleStore = new RoleStore(this);
    this.storyStore = new StoryStore(this);
    this.uiStore = new UiStore(this);

    this.definedWordStore = new DefinedWordStore(this);
    this.definedStoryWordStore = new DefinedStoryWordStore(this);
    //this.categoryStore = new CategoryStore(this);
    //this.drinkStore = new DrinkStore(this);
  }



  loadAllData = async () => {
    //await this.categoryStore.loadAllCategories();
    //this.drinkStore.loadAllDrinks();
  };
}
export default Store;
