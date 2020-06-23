import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import WayfarerModel from "../models/WayfarerModel";


class WayfarerStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.wayfarers = [];
    this.wayfarersService = new RestService("wayfarers");
  }

  addWayfarer(wayfarer){
    !this.wayfarers.includes(wayfarer) && this.wayfarers.push(wayfarer);
  }

  loadAllWayfarers = async () => {
    
    const jsonWayfarers = await this.wayfarersService.getAll();
    console.log(jsonWayfarers);
    jsonWayfarers.forEach(json => this.updateWayfarerFromServer(json));
  };

 // loadWayfarer = async (id) => {
 //   const jsonWayfarer = await this.wayfarersService.getById(id);
 //   this.updateWayfarerFromServer(jsonWayfarer);
 //   return this.resolveWayfarer(id);
 // };
//
 // loadWayfarerUsers = async (id) => {
 //   const jsonUsers = await this.wayfarersService.getById(id, 'users');
 //   this.updateWayfarerFromServer({ id, users: jsonUsers });
 //   return this.resolveWayfarer(id);
 // };

  createWayfarer = async wayfarer => {
    const json = await this.wayfarersService.create(wayfarer);
    this.updateWayfarerFromServer(json);
  };

 // updateLinkedUsers = async wayfarerWithUsers => {
 //   const jsonUsers = await this.wayfarersService.updateLinked(wayfarerWithUsers, 'users');
 //   this.updateWayfarerFromServer({ id: wayfarerWithUsers.id, users: jsonUsers });
 //   return this.resolveWayfarer(wayfarerWithUsers.id);
 // };

  // updateWayfarer = async wayfarer => {
  //   const json = await this.wayfarersService.update(wayfarer);
  //   this.updateWayfarerFromServer(json);
  // };

  // deleteWayfarer = async wayfarer => {
  //   const json = await this.wayfarersService.delete(wayfarer);
  //   this.updateWayfarerFromServer(json);
  // };

  updateWayfarerFromServer(json) {
    let wayfarer = this.wayfarers.find(wayfarer => wayfarer.id === json.id);
    if (!wayfarer) {
      wayfarer = new WayfarerModel({
        id: json.id,
        clanMemberId: json.clanMemberId,
        journeyId: json.journeyId,
        roleId: json.roleId,
        store: this
      });
    }
    console.log(json.roleId)
    if (json.isDeleted) {
      this.wayfarers.remove(wayfarer);
    } else {
      wayfarer.updateFromJson(json);
    }
    return wayfarer;
  }

  resolveWayfarer = id => this.wayfarers.find(wayfarer => wayfarer.id === id);

  addWayfarer = wayfarer => {
    this.wayfarers.push(wayfarer);
  };
}

decorate(WayfarerStore, {
  wayfarers: observable,
  addWayfarer: action,
  updateWayfarerFromServer: action
});

export default WayfarerStore;
