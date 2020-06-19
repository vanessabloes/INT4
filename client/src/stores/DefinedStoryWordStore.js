import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import DefinedStoryWordModel from "../models/DefinedWordModel";


class DefinedStoryWordStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.definedStoryWords = [];
    this.definedStoryWordsService = new RestService("definedstorywords");
  }

  createDefinedStoryWord = async definedStoryWord => {
  const json = await this.definedStoryWordsService.create(definedStoryWord);
  this.updateDefinedStoryWordFromServer(json);
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
     let definedStoryWord = this.definedStoryWords.find(definedStoryWord => definedStoryWord.id === json.id);
     if (!definedStoryWord) {
        
        definedStoryWord = new DefinedStoryWordModel({
            id: json.id, 
            content: json.content,
            definedStoryWordId: json.definedStoryWordId,
            storyId: json.storyId,
            store: this.rootStore.definedStoryWordStore
        });

     }
     if (json.isDeleted) {
       this.definedStoryWords.remove(definedStoryWord);
     } else {
       definedStoryWord.updateFromJson(json);
     }
     return definedStoryWord;
    }

  resolveDefinedStoryWord = id => this.definedStoryWords.find(definedStoryWord => definedStoryWord.id === id);

  addDefinedStoryWord(definedStoryWord){
      this.definedStoryWords.push(definedStoryWord);
  }
}

decorate(DefinedStoryWordStore, {
  definedStoryWords: observable,
  addDefinedStoryWord: action,
  updateDefinedStoryWordFromServer: action
});

export default DefinedStoryWordStore;
