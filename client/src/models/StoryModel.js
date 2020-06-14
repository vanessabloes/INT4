import { v4 } from "uuid";
import { decorate, action, computed, observable } from "mobx";
class StoryModel {
    constructor({id, name, journeyId, store}){
        this.id = id;
        this.name = name;
        this.store = store;
        this.words = [];
        this.updateFromJson({
         journeyId
        });
        this.store.addStory(this);
        //if(journeyId){
        //    this.journey = this.store.journeyStore.resolveJourney(journeyId);
        //}
      
    }


    create = async () => this.store.createStory(this.asJson);
   

    setJourney(journey){
      if(journey){
        this.journeyId = journey.id;
        this.journey.linkStory(this);
      }
     
    }

    addWord(word){
      this.words.push(word);
    }

   

    get journey() {
      return this.store.rootStore.journeyStore.resolveJourney(this.journeyId);
    }

    updateFromJson({ words, journeyId }){
      this.words = words;
      this.setJourney(this.store.rootStore.journeyStore.resolveJourney(journeyId));
    }


    get asJson() {
        return {
          id: this.id,
          name: this.name,
          journeyId: this.journeyId
        };
      }
}

decorate(StoryModel, {
  setJourney: action,
  journey: computed,
  updateFromJson: action,
  words: observable,
  addWord: action,
  asJson: computed
 });

export default StoryModel;