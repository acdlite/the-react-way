import React from 'react';
import { Route, Redirect } from 'react-router';
import AppHandler from './components/AppHandler';
import SlideHandler from './components/SlideHandler';

export default (
  <Route name="app" path="/" handler={AppHandler}>
    <Route name="slide" path="/:currentSlide" handler={SlideHandler} />
    <Redirect from="*" to="/1" />
  </Route>
);
