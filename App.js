import React from 'react';
import AppNavigator from './src/config/appNavigator';
import Serv from './server';
import ApiKeys from './src/config/apiKeys';
import * as firebase from 'firebase';
import Api from './src/config/api';
import AuthStore from './src/config/store/auth';
import Store from './src/config/store';
import registerForPushNotificationsAsync from './notification';
import { Notifications } from 'expo';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    };

    // Initialize firebase...
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
    if (this.state.isAuthenticated){
      AuthStore.loginSuccess(user);
      console.log(AuthStore.user.uid)
    }
    else 
      AuthStore.setIsLogin(false);
  }

  componentDidMount(){
    Api.get('/branches').then(res => {
      Store.setBranches(res.branches)
    }).catch(function(err) {
        console.log('error: ', err);
    });
    Api.get('/products').then(res => {
      Store.setProducts(res.products)
    }).catch(function(err) {
        console.log('error: ', err);
    });
    Api.get('/modifiers').then(res => {
      Store.setModifiers(res.modifiers)
    }).catch(function(err) {
        console.log('error: ', err);
    });
    registerForPushNotificationsAsync();
    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  handleNotification = (notification) => {
    this.setState({ notification });
    // this.show();
  }
  
  render (){
    
    return (
      <AppNavigator/>
      // <Serv/>
    );
  }
}
