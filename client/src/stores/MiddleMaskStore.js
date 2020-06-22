import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import MiddleMaskModel from "../models/MiddleMaskModel";


class MiddleMaskStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.middleMasks = [];
    this.middleMasksService = new RestService("middlemasks");
  }


  loadAllMasks = async () => {
    const jsonMasks = await this.middleMasksService.getAll();

      jsonMasks.forEach(json => this.updateMaskFromServer(json));
  };

  loadMask = async (id) => {
    const jsonMask = await this.groupsService.getById(id);
    this.updateMaskFromServer(jsonMask);
    return this.resolveMask(id);
  };

  updateMaskFromServer(json) {
     let middleMask = this.middleMasks.find(middleMask => middleMask.id === json.id);
     if (!middleMask) {
        middleMask = new MiddleMaskModel({
            id: json.id, 
            middleImage: json.middleImage,
            store: this.rootStore.middleMaskStore
        });

     }
    // if (json.isDeleted) {
    //   this.middleMasks.remove(middleMask);
    // } else {
    //   middleMask.updateFromJson(json);
    // }
    // return middleMask;
    }

  resolveMiddleMask = id => this.middleMasks.find(middleMask => middleMask.id === id);

  addMiddleMask(middleMask){

      this.middleMasks.push(middleMask);
  }
}

decorate(MiddleMaskStore, {
  middleMasks: observable,
  addMiddleMask: action,
  updateMiddleMaskFromServer: action
});

export default MiddleMaskStore;
