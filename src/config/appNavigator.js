import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import vars from "../utils/vars";
import {DrawerNav, CartIcon} from '../components';
import {Home, OrderDetail, ProductDetail, Login, Tracking, SignUp, OrderStatus, SignInHome, 
    Profile, Splash, Cart, Checkout, Comment, Branch, Invoice, OrderSuccess } from '../screens';
import {Icon, Right, Left} from 'native-base';


const stacknav = createStackNavigator({
  Splash : { screen : Splash },
  Main : {screen: Home },
  OrderDetail: {screen: OrderDetail},
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions : ({navigation}) => ({
    headerLeft:
    <Left style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity style={{paddingLeft:9}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" style={{color:'white'}} />
      </TouchableOpacity>
      <CartIcon navigation={navigation}/>
    </Left>
    })
  },
  SignUp: { screen: SignUp },
  SignInHome : { screen: SignInHome },
  Tracking : { screen: Tracking },
  OrderStatus : { screen: OrderStatus},
  Login : { screen: Login },
  Profile : { screen: Profile },
  Cart : { screen: Cart },
  Checkout : { screen: Checkout },
  Comment : { screen: Comment },
  Branch : { screen: Branch },
  Invoice : { screen: Invoice },
  OrderSuccess : { screen: OrderSuccess }
  },{
    defaultNavigationOptions: ({navigation}) => ({
      title: " ",
      headerRight:(   
        <Right style={{paddingRight:9}}>
          <Icon name="menu"  onPress={() => navigation.openDrawer()} style={{color:'white'}} />
        </Right>
      ),
      headerLeft:(
        <CartIcon navigation={navigation}/>
      ),
      headerStyle: { 
        backgroundColor: vars.baseColor, 
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
       },
      headerTitleStyle: {
        fontWeight: 'bold', color: 'white'
      },
      backBehavior: 'initialRoute',
      initialRouteName: 'Main'
    })
  })
  
const AppDrawer = createDrawerNavigator(
  {
    Setting: {screen: stacknav}
  },{
    contentComponent: props => <DrawerNav{...props} />,
    drawerPosition: 'right',
    drawerBackgroundColor: 'rgba(34,34,34,0.9)',
    overlayColor : 'transparent'
  });
  
const AppNavigator = createAppContainer(AppDrawer);

export default AppNavigator;





