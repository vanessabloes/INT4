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
    return this.resolveStory(id);
  };
  // nog uit te werken
  loadStoryWords = async (id) => {
    const jsonWords = await this.storyService.getById(id, 'words');
    this.updateStoryFromServer({ id, words: jsonWords });
    console.log(jsonWords)
    console.log(id)
    return this.resolveStory(id);
  };
  //
  //createStory = async story => {
  //  const json = await this.storyService.create(story);
  //  this.updateStoryFromServer(json);
  //};
  //
  //updateLinkedUsers = async storyWithUsers => {
  //  const jsonUsers = await this.storyService.updateLinked(storyWithUsers, 'users');
  //  this.updateStoryFromServer({ id: storyWithUsers.id, users: jsonUsers });
  //  return this.resolveStory(storyWithUsers.id);
  //};

  updateStory = async story => {
    // const json = await this.storyService.update(story);
    const json = { "id": 1, "name": "good story", "words": ["knight", "feather"], "journeyId": "1" };
    this.updateStoryFromServer(json);
  };


  updateStoryFromServer(json) {
    let story = this.stories.find(story => story.id === json.id); // gaat sws de story al vinden en geen nieuwe aanmaken => updaten
    if (!story) {
      story = new StoryModel({
        id: json.id,
        name: json.name,
        words: json.words,
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
