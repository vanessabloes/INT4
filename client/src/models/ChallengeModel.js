import { decorate, computed } from "mobx";

class ChallengeModel {
    constructor({ id, roleId, indoor, outdoor, store }) {
        this.id = id;
        this.roleId = roleId;
        this.indoor = indoor;
        this.outdoor = outdoor;
        this.store = store;
        this.store.addChallenge(this);
    }

    get asJson() {
        return {
            id: this.id,
            roleId: this.roleId,
            indoor: this.indoor,
            outdoor: this.outdoor
        };
    }
}
decorate(ChallengeModel, {
    asJson: computed
});

export default ChallengeModel;  