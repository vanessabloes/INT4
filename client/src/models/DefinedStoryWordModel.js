import { v4 } from "uuid";
import { decorate, computed, observable } from "mobx";
class DefinedStoryWordModel {
    constructor({id = v4(), content, definedWordId, storyId, store}){
        this.id = id;
        this.content = content;
        this.definedWordId = definedWordId;
        this.storyId = storyId;
        this.isReached = false;
        this.store = store;
        this.store.addDefinedStoryWord(this);
    }

     
    create = async () => this.store.createDefinedStoryWord(this.asJson);

    updateFromJson({ }){
   
      console.log("hey im usels")
  }


    get asJson() {
        return {
          id: this.id,
          content: this.content,
          isReached: this.isReached,
          storyId: this.storyId,
          definedWordId: this.definedWordId,
          
        };
      }
}
decorate(DefinedStoryWordModel, {
asJson: computed,
isReached: observable
 });
export default DefinedStoryWordModel;