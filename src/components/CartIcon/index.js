import React, {Component} from 'react';
import { TouchableOpacity, View , Text} from 'react-native';
import {Icon} from 'native-base';
import Store from '../../config/store'
import {observer} from 'mobx-react/native';

@observer
class CartIcon extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <TouchableOpacity style={{paddingLeft:9}} onPress={()=> navigation.navigate('Cart')}>
        <Icon  name="cart"  style={{color:'white', fontSize:35}}/>
        <View style={{position:'absolute', height: 17, width:17, borderRadius: 50, left:25, bottom:22, 
          alignItems:'center', backgroundColor:'hsla(0, 0%, 0%, 0.6)', justifyContent:'center', }}
        >
          <Text style={{color:'white', fontWeight:'bold', textAlign:'center', fontSize:10}}>{Store.cartCount}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


export default CartIcon;