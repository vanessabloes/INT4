import React from "react";
//import styles from "./App.module.css";

import { useStore } from "./hooks/index";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "./consts";
import Home from "./containers/Home";
import JourneyDetail from "./containers/JourneyDetail";
import StoryDetail from "./containers/StoryDetail";
import MyClan from "./containers/MyClan";
import AddJourney from "./containers/AddJourney";
import AddStory from "./containers/AddStory";



const App = () => {
  const { journeyStore } = useStore() // is nodig om de window.store te kunnen gebruiken om te testen
  return (
      <>
        <Switch>
       <Route path={ROUTES.myClan}>
           <MyClan />
       </Route>

       <Route path={ROUTES.addJourney}>
           <AddJourney />
       </Route>

       <Route path={ROUTES.addStory}>
           <AddStory />
       </Route>

       <Route path={ROUTES.storyDetail.path}>
           <StoryDetail />
       </Route>

       <Route path={ROUTES.journeyDetail.path}>
           <JourneyDetail />
       </Route>

       <Route path={ROUTES.home}>
           <Home />
       </Route>
 </Switch>
    </>
    
  );
};

export default App;
