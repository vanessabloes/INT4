import { v4 } from "uuid";
import { decorate, action, computed } from "mobx";
class StoryModel {
    constructor({id, name, journeyId, store}){
        this.id = id;
        this.name = name;
        this.store = store;
       
        this.updateFromJson({
         journeyId
        });
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

   

    get journey() {
      return this.store.journeyStore.resolveJourney(this.journeyId);
    }

    updateFromJson({ journeyId }){
      this.setJourney(this.store.journeyStore.resolveJourney(journeyId));
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
  asJson: computed
 });

export default StoryModel;