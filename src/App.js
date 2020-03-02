import React from 'react';
import { Switch, Route} from 'react-router-dom'; 
import './App.css';

import HomePage from './components/pages/homepage/homepage.component.jsx';
import ShopPage from './components/pages/shop/shop.components';
import SignInAndSignUpPage from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.components.jsx';

import {auth} from './firebase/firebase.utils';


class App extends React.Component {

  constructor(){
    super();

    this.state= {

      currentUser:null
    }
  }    

  unsubscribeFromAuth =null;

  componentDidMount(){
   
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {

      this.setState({currentUser: user});

    })
  }

  componentWillUnmount(){

    this.unsubscribeFromAuth();

  }

  render() {
    return (
      <div >
        <Header currentUser={this.state.currentUser}/>
        <Switch>

          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        


        </Switch>
      </div>
    );
  }

}



export default App;
