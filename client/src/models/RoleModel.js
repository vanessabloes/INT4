import { decorate, computed } from "mobx";
class RoleModel {
    constructor({id, roleName, roleDescription, powerName, powerDescription, image, store}){
        this.id = id;
        this.roleName = roleName;
        this.roleDescription = roleDescription;
        this.powerName = powerName;
        this.powerDescription = powerDescription;
        this.image = image;
        this.store = store;
        this.store.addRole(this);
    }

    get asJson() {
        return {
          id: this.id,
          roleName: this.roleName,
          roleDescription: this.roleDescription,
          powerName: this.powerName,
          powerDescription: this.powerDescription,
          image: this.image
        };
      }
}
decorate(RoleModel, {
asJson: computed
 });
 
export default RoleModel;