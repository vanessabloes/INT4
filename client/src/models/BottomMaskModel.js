import { v4 } from "uuid";
import { decorate, computed } from "mobx";
class BottomMaskModel {
    constructor({id = v4(), bottomImage, store}){
        this.id = id;
        this.bottomImage = bottomImage;
        this.store = store;
        this.store.addBottomMask(this);
    }

    get asJson() {
        return {
          id: this.id,
          bottomImage: this.bottomImage
        };
      }
}
decorate(BottomMaskModel, {
asJson: computed
 });
export default BottomMaskModel;