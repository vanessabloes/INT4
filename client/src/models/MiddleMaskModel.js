import { decorate, computed } from "mobx";
class MiddleMaskModel {
    constructor({id , middleImage, store}){
        this.id = id;
        this.middleImage = middleImage;
        this.store = store;
        this.store.addMiddleMask(this);
    }

    get asJson() {
        return {
          id: this.id,
          middleImage: this.middleImage
        };
      }
}
decorate(MiddleMaskModel, {
asJson: computed
 });
export default MiddleMaskModel;