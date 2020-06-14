import React from "react";
import styles from "./App.module.css";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "./consts/";
import Home from "./components/Home";
import JourneyDetail from "./components/JourneyDetail";
import StoryDetail from "./components/StoryDetail";
import MyClan from "./components/MyClan";
import AddJourney from "./components/AddJourney";
import AddStory from "./components/AddStory";
import { useStore } from "./hooks/index"


const App = () => {
  const { journeyStore } = useStore() // is nodig om de window.store te kunnen gebruiken om te testen
  return (

    <main className={styles.layout}>
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
    </main>
  );
};

export default App;
