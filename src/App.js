import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './components/HomePage';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { Provider } from "react-redux"
import configureStore from "./redux/configureStore";

const store = configureStore();


function App() {
  return (
    <Router>
      <Provider store={store}>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/list">
              <PokemonList />
            </Route>
            <Route path="/pokemon">
              <PokemonDetail />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
