import { v4 } from "uuid";
import { decorate, observable, configure, computed, action } from "mobx";

configure({ enforceActions: `observed` });

class WordModel {
    constructor({ id = v4(), content, storyId, store }) {
        this.id = id;
        this.content = content;
        this.storyId = storyId;
        this.store = store;
        this.store.addWord(this);
    }



    create = async () => this.store.createWord(this.asJson);

  


    get asJson() {
        return {
          id: this.id,
          content: this.content,
          storyId: this.storyId
        };
      }
}

decorate(WordModel, {
    content: observable,
    asJson: computed
});

export default WordModel;