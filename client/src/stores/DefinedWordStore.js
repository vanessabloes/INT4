import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import DefinedWordModel from "../models/DefinedWordModel";
import { v4 } from "uuid";

class DefinedWordStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.definedWords = [];
    this.definedWordsService = new RestService("definedWords");
  }


  loadAllDefinedWords = async () => {
    //const jsonDefinedWords = await this.groupsService.getAll();
    const fakeJsonDefinedWords = [
        {id: v4(), content: "word1"}, // dit komt uit de db, dus om v4() in de db te genereren is onozel,dus wss zal dit terug veranderen naar "1" als id (string)
        {id: v4(), content: "word2"},
        {id: v4(), content: "word3"}
      ]


      fakeJsonDefinedWords.forEach(json => this.updateDefinedWordFromServer(json));
  };

  loadDefinedWord = async (id) => {
    const jsonDefinedWord = await this.groupsService.getById(id);
    this.updateDefinedWordFromServer(jsonDefinedWord);
    return this.resolveDefinedWord(id);
  };

  updateDefinedWordFromServer(json) {
     let definedWord = this.definedWords.find(definedWord => definedWord.id === json.id);
     if (!definedWord) {
        
        definedWord = new DefinedWordModel({
            id: json.id, 
            content: json.content,
            store: this.rootStore.definedWordStore
        });

     }
     //if (json.isDeleted) {
     //  this.definedWords.remove(definedWord);
     //} else {
     //  definedWord.updateFromJson(json);
     //}
     return definedWord;
    }

  resolveDefinedWord = id => this.definedWords.find(definedWord => definedWord.id === id);

  addDefinedWord(definedWord){
      this.definedWords.push(definedWord);
  }
}

decorate(DefinedWordStore, {
  definedWords: observable,
  addDefinedWord: action,
  updateDefinedWordFromServer: action
});

export default DefinedWordStore;
