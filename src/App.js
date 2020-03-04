import React from 'react';
import { Switch, Route} from 'react-router-dom'; 
import {connect} from 'react-redux';
import './App.css';

import HomePage from './components/pages/homepage/homepage.component.jsx';
import ShopPage from './components/pages/shop/shop.components';
import SignInAndSignUpPage from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.components.jsx';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.action';


class App extends React.Component {

  /*constructor(){
    super();

    this.state= {

      currentUser:null
    }
  }*/    

  unsubscribeFromAuth =null;


  componentDidMount(){

   const {setCurrentUser}=this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

     if (userAuth){

      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          
        })
      });
     }else {

       setCurrentUser(userAuth);
     }

    });
  }

  componentWillUnmount(){

    this.unsubscribeFromAuth();

  }

  render() {
    return (
      <div >
        <Header />
        <Switch>

          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
      

        </Switch>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({

  setCurrentUser: user => dispatch(setCurrentUser(user))

});

export default connect(null, mapDispatchToProps)(App)
