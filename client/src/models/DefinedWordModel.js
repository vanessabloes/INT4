import { v4 } from "uuid";
import { decorate, computed, observable } from "mobx";
class DefinedWordModel {
    constructor({id, content, store}){
        this.id = id;
        this.content = content;
        this.store = store;
        this.store.addDefinedWord(this);
    }

     
    



    get asJson() {
        return {
          id: this.id,
          content: this.content,
          isReached: this.isReached,
        };
      }
}
decorate(DefinedWordModel, {
asJson: computed,
 });
export default DefinedWordModel;