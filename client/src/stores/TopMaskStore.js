import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import TopMaskModel from "../models/TopMaskModel";


class TopMaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.topMasks = [];
    this.topMasksService = new RestService("topmasks");
  }


  loadAllMasks = async () => {
    const jsonMasks = await this.topMasksService.getAll();

 
    //const fakeJsonMasks = [
    //    {"topMaskName":"Foodie", "topMaskDescription":"Doe", "powerName":"Doe","powerDescription":"Doe","image":"Doe" }
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
     let topMask = this.topMasks.find(topMask => topMask.id === json.id);
     if (!topMask) {
        topMask = new TopMaskModel({
            id: json.id, 
            topImage: json.topImage,
            store: this.rootStore.topMaskStore
        });

     }
      // if (json.isDeleted) {
      //   this.topMasks.remove(topMask);
      // } else {
      //   topMask.updateFromJson(json);
      // }
      // return topMask;
    }

  resolveTopMask = id => this.topMasks.find(topMask => topMask.id === id);

  addTopMask(topMask){
  
      this.topMasks.push(topMask);
  }
}

decorate(TopMaskStore, {
  topMasks: observable,
  addTopMask: action,
  updateTopMaskFromServer: action,
  resolveTopMask: action
});

export default TopMaskStore;
