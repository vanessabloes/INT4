import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import RoleModel from "../models/RoleModel";


class RoleStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.roles = [];
    this.rolesService = new RestService("roles");
  }


  loadAllRoles = async () => {
    const jsonRoles = await this.rolesService.getAll();
    console.log(jsonRoles);
    //const fakeJsonRoles = [
    //    {"roleName":"Foodie", "roleDescription":"Doe", "powerName":"Doe","powerDescription":"Doe","image":"Doe" }
    //  ]
//
//
      jsonRoles.forEach(json => this.updateRoleFromServer(json));
  };

  loadRole = async (id) => {
    const jsonRole = await this.groupsService.getById(id);
    this.updateRoleFromServer(jsonRole);
    return this.resolveRole(id);
  };

  updateRoleFromServer(json) {
     let role = this.roles.find(role => role.id === json.id);
     if (!role) {
        role = new RoleModel({
            id: json.id, 
            roleName: json.roleName, 
            roleDescription: json.roleDescription, 
            powerName: json.powerName, 
            powerDescription: json.powerDescription, 
            image: json.image,
            store: this.rootStore.roleStore
        });

     }
    // if (json.isDeleted) {
    //   this.roles.remove(role);
    // } else {
    //   role.updateFromJson(json);
    // }
    // return role;
    }

  resolveRole = id => this.roles.find(role => role.id === id);

  addRole(role){
    console.log(role)
      this.roles.push(role);
  }
}

decorate(RoleStore, {
  roles: observable,
  addRole: action,
  updateRoleFromServer: action
});

export default RoleStore;
