import { v4 } from "uuid";
import { decorate, computed, observable } from "mobx";
class DefinedStoryWordModel {
    constructor({id = v4(), content, definedWordId, storyId, store}){
        this.id = id;
        this.content = content;
        this.definedWordId = definedWordId;
        this.storyId = storyId;
        this.isReached = undefined;
        this.store = store;
        this.store.addDefinedStoryWord(this);
    }

     
    



    get asJson() {
        return {
          id: this.id,
          content: this.content,
          definedWordId: this.definedWordId,
          isReached: this.isReached,
        };
      }
}
decorate(DefinedStoryWordModel, {
asJson: computed,
isReached: observable
 });
export default DefinedStoryWordModel;