import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import BottomMaskModel from "../models/BottomMaskModel";


class BottomMaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.bottomMasks = [];
    this.bottomMasksService = new RestService("bottommasks");
  }


  loadAllMasks = async () => {
    const jsonMasks = await this.bottomMasksService.getAll();
  
    //const fakeJsonMasks = [
    //    {"bottomMaskName":"Foodie", "bottomMaskDescription":"Doe", "powerName":"Doe","powerDescription":"Doe","image":"Doe" }
    //  ]
//
//
      jsonMasks.forEach(json => this.updateMaskFromServer(json));
  };

  loadMask = async (id) => {
    const jsonMask = await this.groupsService.getById(id);
    this.updateMaskFromServer(jsonMask);
    return this.resolveMask(id);
  };

  updateMaskFromServer(json) {
     let bottomMask = this.bottomMasks.find(bottomMask => bottomMask.id === json.id);
     if (!bottomMask) {
        bottomMask = new BottomMaskModel({
            id: json.id, 
            bottomImage: json.bottomImage,
            store: this.rootStore.bottomMaskStore
        });

     }
    // if (json.isDeleted) {
    //   this.bottomMasks.remove(bottomMask);
    // } else {
    //   bottomMask.updateFromJson(json);
    // }
    // return bottomMask;
    }

  resolveBottomMask = id => this.bottomMasks.find(bottomMask => bottomMask.id === id);

  addBottomMask(bottomMask){
   
      this.bottomMasks.push(bottomMask);
  }
}

decorate(BottomMaskStore, {
  bottomMasks: observable,
  addBottomMask: action,
  updateBottomMaskFromServer: action,
  resolveBottomMask: action
});

export default BottomMaskStore;
