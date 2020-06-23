import { v4 } from "uuid";
import { decorate, computed, observable, action } from "mobx";
class DefinedStoryWordModel {
    constructor({id = v4(), content, definedWordId, storyId, store}){
        this.id = id;
        this.content = content;
        this.definedWordId = definedWordId;
        this.storyId = storyId;
        this.isReached = "false";
        this.store = store;
        this.store.addDefinedStoryWord(this); // voor de DefinedStoryWordStore
    }

    setReached = value => {
      this.isReached = value;
    }
    create = async () => this.store.createDefinedStoryWord(this.asJson);
    update = async () => this.store.updateDefinedStoryWord(this.asJson);

    updateFromJson(definedStoryWord){
      const story = this.store.rootStore.storyStore.resolveStory(definedStoryWord.storyId);
      story.addDefinedStoryWord(definedStoryWord);
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
isReached: observable,
setReached: action
 });
export default DefinedStoryWordModel;