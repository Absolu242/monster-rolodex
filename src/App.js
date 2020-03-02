import React from 'react';
import { Switch, Route} from 'react-router-dom'; 
import './App.css';

import HomePage from './components/pages/homepage/homepage.component.jsx';
import ShopPage from './components/pages/shop/shop.components';
import Header from './components/header/header.components.jsx';




function App() {
  return (
    <div >
      <Header/>
      <Switch>

        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />

      </Switch>
    </div>
  );
}


export default App;
