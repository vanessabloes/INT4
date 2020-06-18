import { v4 } from "uuid";
import { decorate, observable, configure } from "mobx";

configure({ enforceActions: `observed` });

class WordModel {
    constructor({ id = v4(), content }) {
        this.id = id;
        this.content = content;
    }
}

decorate(WordModel, {
    content: observable
});

export default WordModel;