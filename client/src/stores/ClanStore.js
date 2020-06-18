import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import ClanModel from "../models/ClanModel";


class ClanStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.clans = [];
    this.clansService = new RestService("clans");
  }

  addClan(clan){
    !this.clans.includes(clan) && this.clans.push(clan);
  }

  loadAllClans = async () => {
    const jsonClans = await this.clansService.getAll();
    jsonClans.forEach(json => this.updateClanFromServer(json));
    console.log(jsonClans);
  };

  loadClan = async (id) => {
    const jsonClan = await this.groupsService.getById(id);
    this.updateClanFromServer(jsonClan);
    return this.resolveClan(id);
  };

  loadClanUsers = async (id) => {
    const jsonUsers = await this.groupsService.getById(id, 'users');
    this.updateClanFromServer({ id, users: jsonUsers });
    return this.resolveClan(id);
  };

  createClan = async clan => {
    const json = await this.clansService.create(clan);
    this.updateClanFromServer(json);
  };

  updateLinkedUsers = async groupWithUsers => {
    const jsonUsers = await this.groupsService.updateLinked(groupWithUsers, 'users');
    this.updateClanFromServer({ id: groupWithUsers.id, users: jsonUsers });
    return this.resolveClan(groupWithUsers.id);
  };

  // updateClan = async group => {
  //   const json = await this.groupsService.update(group);
  //   this.updateClanFromServer(json);
  // };

  // deleteClan = async group => {
  //   const json = await this.groupsService.delete(group);
  //   this.updateClanFromServer(json);
  // };

  updateClanFromServer(json) {
    let clan = this.clans.find(clan => clan.id === json.id);
    console.log(clan);
    if (!clan) {
      clan = new ClanModel({
        id: json.id,
        name: json.name,
        password: json.password,
        store: this
      });
    }
    console.log(clan)
    if (json.isDeleted) {
      this.clans.remove(clan);
    } else {
      clan.updateFromJson(json);
    }
    return clan;
  }

  resolveClan = id => this.clans.find(clan => clan.id === id);


}

decorate(ClanStore, {
  clans: observable,
  addClan: action,
  updateClanFromServer: action,
  resolveClan: action,
  loadAllClans: action
});

export default ClanStore;
