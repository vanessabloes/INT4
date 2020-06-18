import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import DefinedStoryWordModel from "../models/DefinedWordModel";


class DefinedStoryWordStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.definedStoryWords = [];
    this.definedStoryWordsService = new RestService("definedStoryWords");
  }


  loadAllDefinedStoryWords = async () => {
    //const jsonDefinedStoryWords = await this.groupsService.getAll();
    const fakeJsonDefinedStoryWords = [

      ]


      fakeJsonDefinedStoryWords.forEach(json => this.updateDefinedStoryWordFromServer(json));
  };

  loadDefinedStoryWord = async (id) => {
    const jsonDefinedStoryWord = await this.groupsService.getById(id);
    this.updateDefinedStoryWordFromServer(jsonDefinedStoryWord);
    return this.resolveDefinedStoryWord(id);
  };

  updateDefinedStoryWordFromServer(json) {
     let definedWord = this.definedStoryWords.find(definedWord => definedWord.id === json.id);
     if (!definedWord) {
        
        definedWord = new DefinedStoryWordModel({
            id: json.id, 
            content: json.content,
            store: this.rootStore.definedWordStore
        });

     }
     //if (json.isDeleted) {
     //  this.definedStoryWords.remove(definedWord);
     //} else {
     //  definedWord.updateFromJson(json);
     //}
     return definedWord;
    }

  resolveDefinedStoryWord = id => this.definedStoryWords.find(definedWord => definedWord.id === id);

  addDefinedStoryWord(definedWord){
      this.definedStoryWords.push(definedWord);
  }
}

decorate(DefinedStoryWordStore, {
  definedStoryWords: observable,
  addDefinedStoryWord: action,
  updateDefinedStoryWordFromServer: action
});

export default DefinedStoryWordStore;
