import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header/header';
import Home from './home/home';
import Product from './product/product';
import Results from './results/results';
import {URLS} from '../constants/urls';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path={URLS.root} exact component={Home} />
      <Route path={URLS.product} exact component={Product} />
      <Route path={URLS.results} component={Results} />
    </Switch>
  </Router>
);

export default App;
