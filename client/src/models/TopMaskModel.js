import { v4 } from "uuid";
import { decorate, computed } from "mobx";
class TopMaskModel {
    constructor({id = v4(), topImage, store}){
        this.id = id;
        this.topImage = topImage;
        this.store = store;
        this.store.addTopMask(this);
    }

    get asJson() {
        return {
          id: this.id,
          topImage: this.topImage
        };
      }
}
decorate(TopMaskModel, {
asJson: computed
 });
export default TopMaskModel;