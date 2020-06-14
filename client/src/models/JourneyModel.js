import { decorate, action, computed, observable } from "mobx";
import { v4 } from "uuid";

class JourneyModel {
    constructor({id, stories = [], store, ...json}){
        if (!store) {
            throw new Error("A journey needs a store");
          }
        this.id = id;
        this.store = store;
        this.stories = stories;
        this.wayfarers = [];
        this.updateFromJson(json);
        this.store.addJourney(this);
    }

    create = async () => this.store.createJourney(this.asJson);

    linkStory(story) {
        !this.stories.includes(story) && this.stories.push(story);
      }

    linkWayfarer(wayfarer){
      !this.wayfarers.includes(wayfarer) && this.wayfarers.push(wayfarer);
    }
      
    updateFromJson({ name, wayfarers }){
        this.name = name;
        //wayfarers.forEach(wayfarer => {
        //  console.log(wayfarer);
        //  wayfarer.linkJourney(this);
          //this.store.clanMemberStore.updateWayfarerFromServer(wayfarer).linkJourney(this);
     
       // });

    }

    get asJson() {
        return {
          id: this.id,
          name: this.name,
        };
      }
}

decorate(JourneyModel, {
  wayfarers: observable,
  stories: observable,
  linkStory:action,
  linkWayfarer: action,
  updateFromJson: action,
  asJson: computed
 });

export default JourneyModel;