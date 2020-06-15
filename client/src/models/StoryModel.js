import { v4 } from "uuid";
import { decorate, action, computed, observable } from "mobx";
const allDefinedWordsFromServer = [{"id": 1, content:"word1"},{"id": 2, content: "word2"},{"id": 3, content: "word3"}] // komt van store ergens
class StoryModel {
    constructor({id, name, journeyId, store}){
        this.id = id;
        this.name = name;
        this.store = store;
        this.words = [];
        this.definedWords = [];
        this.getDefinedWords();
        this.updateFromJson({
         journeyId
        });
 
        this.store.addStory(this);
        //if(journeyId){
        //    this.journey = this.store.journeyStore.resolveJourney(journeyId);
        //}
      
    }

     getDefinedWords(){
        for (let index = 0; this.definedWords.length < 5; index++) {
          const randomItem = allDefinedWordsFromServer[Math.floor(Math.random() * allDefinedWordsFromServer.length)];
          console.log(this.store.rootStore.uiStore.currentJourney.definedWords);
        //  console.log(randomItem);
        console.log(this.checkDefinedWord(randomItem));
          if(this.checkDefinedWord(randomItem) === true){
            console.log("already in journey")
          }else{
           //console.log(d);index++
          };
          
        }
    }
      checkDefinedWord(definedWord){
      if(definedWord.id === 1 ){
       
       // test of woord al in journey zit
        return true;
      }else{
       // console.log(definedWord);
         this.setDefinedWord(definedWord);
        return false;
      }
    }

     setDefinedWord(definedWord){
      this.definedWords.push(definedWord);
       this.store.rootStore.uiStore.currentJourney.addDefinedWord(definedWord); 
    }

    create = async () => this.store.createStory(this.asJson);
   
   

    setJourney(journey){
      if(journey){
        this.journeyId = journey.id;
        this.journey.linkStory(this);
      }
    }

 

  

    addWord(word){
      this.words.push(word);
    }

   

    get journey() {
      return this.store.rootStore.journeyStore.resolveJourney(this.journeyId);
    }

    updateFromJson({ words, journeyId }){
      this.words = words;
      this.setJourney(this.store.rootStore.journeyStore.resolveJourney(journeyId));
    }


    get asJson() {
        return {
          id: this.id,
          name: this.name,
          definedWords: this.definedWords,
          journeyId: this.journeyId
        };
      }
}

decorate(StoryModel, {
  setJourney: action,
  journey: computed,
  updateFromJson: action,
  words: observable,
  addWord: action,
  asJson: computed
 });

export default StoryModel;