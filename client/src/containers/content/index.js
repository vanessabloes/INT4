import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "../../consts";
import Home from "../content/Home";
import JourneyDetail from "../content/JourneyDetail";
import StoryDetail from "../content/StoryDetail";
import MyClan from "../content/MyClan";
import AddJourney from "../content/AddJourney";
import AddStory from "../content/AddStory";

const Content = () => {
  return (
    <main>
        
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

Content.propTypes = {

};

export default Content;
