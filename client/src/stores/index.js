import { configure } from "mobx";
import JourneyStore from "./JourneyStore";
import ClanMemberStore from "./ClanMemberStore";
import RoleStore from "./RoleStore";
import StoryStore from "./StoryStore";
import UiStore from "./UiStore";

configure({ enforceActions: `observed` });

class Store {
  constructor() {
    this.clanMemberStore = new ClanMemberStore(this);
    this.journeyStore = new JourneyStore(this);
    this.roleStore = new RoleStore(this);
    this.storyStore = new StoryStore(this);
    this.uiStore = new UiStore(this);
    //this.categoryStore = new CategoryStore(this);
    //this.drinkStore = new DrinkStore(this);
  }



  loadAllData = async () => {
    //await this.categoryStore.loadAllCategories();
    //this.drinkStore.loadAllDrinks();
  };
}
export default Store;
