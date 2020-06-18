// import { decorate, observable, action } from "mobx";

class CoreStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }
}

// decorate(CoreStore, {
// });

export default CoreStore;
