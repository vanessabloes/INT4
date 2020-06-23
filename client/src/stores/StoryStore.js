import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import StoryModel from "../models/StoryModel";

class StoryStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.stories = [];
    this.storyService = new RestService("stories");
  }



  loadAllStories = async () => {
    const jsonStories = await this.storyService.getAll();
    jsonStories.forEach(json => this.updateStoryFromServer(json));
  };
  
  loadStory = async (id) => {
    const jsonStory = await this.storyService.getById(id);
    this.updateStoryFromServer(jsonStory);
    console.log(jsonStory)
    return this.resolveStory(id);
  };
  // nog uit te werken
  loadAllSpokenNounsForStory = async (id) => {
    console.log(id);
    const jsonWords = await this.storyService.getById(id, 'words');
    console.log(jsonWords)
    this.updateStoryFromServer({ id, words: jsonWords });
    
    return this.resolveStory(id);
  };

  loadDefinedStoryWordsForStory = async (id) => {
    console.log(id);
    const jsonDefinedStoryWords = await this.storyService.getById(id, 'definedstorywords');
    console.log(jsonDefinedStoryWords)
    this.updateStoryFromServer({ id, definedStoryWords: jsonDefinedStoryWords });
    return this.resolveStory(id);
  };
  
  createStory = async story => {
    console.log(story);
    const json = await this.storyService.create(story);
    console.log(json);
    this.updateStoryFromServer(json);
  };

  updateLinkedDefinedStoryWords = async storyWithDefinedStoryWords => {
    const jsonDefinedStoryWords = await this.storyService.updateLinked(storyWithDefinedStoryWords, 'definedstorywords');
    this.updateStoryFromServer({ id: storyWithDefinedStoryWords.id, definedStoryWords: jsonDefinedStoryWords });
    return this.resolveStory(storyWithDefinedStoryWords.id);
  };

  updateStory = async story => {
    console.log(story);
     const json = await this.storyService.update(story);
     console.log(json);
    this.updateStoryFromServer(json);
  };


  updateStoryFromServer(json) {
    let story = this.stories.find(story => story.id === json.id); // gaat sws de story al vinden en geen nieuwe aanmaken => updaten
    if (!story) {
      story = new StoryModel({
        id: json.id,
        name: json.name,
        journeyId: json.journeyId,
        store: this.rootStore.storyStore
      });
    }
    if (json.isDeleted) {
      this.story.remove(story);
    } else {
      story.updateFromJson(json); // als er een nieuw woord uitgesproken wordt, moet dit uiteindelijk triggeren, json.words is aangepast hierin
    }
    return story;
  }

  resolveStory = id => this.stories.find(story => story.id === id);

  addStory = story => {
    this.stories.push(story);
  };
}

decorate(StoryStore, {
  stories: observable,
  addStory: action,
  updateStoryFromServer: action
});

export default StoryStore;
