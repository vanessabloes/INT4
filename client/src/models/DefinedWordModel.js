import { v4 } from "uuid";
import { decorate, computed } from "mobx";
class DefinedWordModel {
  constructor({ id = v4(), content, store }) {
    this.id = id;
    this.content = content;
    this.store = store;
  
    this.store.addDefinedWord(this);
  }


  get asJson() {
    return {
      id: this.id,
      content: this.content
    };
  }
}
decorate(DefinedWordModel, {
  asJson: computed,
});
export default DefinedWordModel;