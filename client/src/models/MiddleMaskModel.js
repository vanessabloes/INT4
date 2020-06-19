import { v4 } from "uuid";
import { decorate, computed } from "mobx";
class MiddleMaskModel {
    constructor({id = v4(), middle, store}){
        this.id = id;
        this.middle = middle;
        this.store = store;
        this.store.addMiddleMask(this);
    }

    get asJson() {
        return {
          id: this.id,
          middle: this.middle
        };
      }
}
decorate(MiddleMaskModel, {
asJson: computed
 });
export default MiddleMaskModel;