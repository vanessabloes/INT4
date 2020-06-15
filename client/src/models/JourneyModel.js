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
        this.definedWords = [];
        this.updateFromJson(json);
        this.store.addJourney(this);
    }

    create = async () => this.store.createJourney(this.asJson);

    update = async () => this.store.updateJourney(this.asJson);
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

   async addDefinedWord(definedWord){
      await this.definedWords.push(definedWord);
    }

    get asJson() {
        return {
          id: this.id,
          name: this.name,
          stories: this.stories,
          wayfarers: this.wayfarers,
          definedWords: this.definedWords
        };
      }
}

decorate(JourneyModel, {
  definedWords: observable,
  addDefinedWord: action,
  wayfarers: observable,
  stories: observable,
  linkStory:action,
  linkWayfarer: action,
  updateFromJson: action,
  asJson: computed
 });

export default JourneyModel;