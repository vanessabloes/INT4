import { decorate, observable, action } from "mobx";

class CoreStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.state = "loading";
    }

    setState(state) {
        this.state = state;
    }
}

decorate(CoreStore, {
    state: observable,
    setState: action
});

export default CoreStore;
