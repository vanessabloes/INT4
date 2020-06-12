const ROUTES = {
    home: "/",
    myClan: "/myclan",
    addJourney: "/addjourney",
    addStory: "/:id/addStory",
    journeyDetail: { path: "/:id", to: "/" }, // to = de backlink naar parentpagina
    storyDetail: { path: "/:id/:story_id", to: "/:id" }, // to = de backlink naar parentpagina
  };
  
  export { ROUTES };
  