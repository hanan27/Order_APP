import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import vars from '../../utils/vars';
import Icon from 'react-native-vector-icons/AntDesign';
import Store from '../../config/store/';
import {observer} from 'mobx-react/native';

@observer
class CartCard extends Component {

  render() {
    const { item, index } = this.props;
    return (
    <View style={styles.containerStyle}>
      <Image source={{uri: item.image_path}} style={styles.imageStyle} />
      <View style={styles.textStyle}>
        <Text style={{fontSize: 16, textAlign: 'right'}}><Text style={{fontSize: 14}}>{item.quantity}x </Text>{item.name.ar} </Text>
        <View style={styles.priceStyle}>
          <Text style={{fontSize: 10}}>{item.final_price} ريال</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 12}}>الحجم {item.size.name.ar}</Text>
          {item.options.length > 0 ?
            <React.Fragment>
              {item.options.map((option, i) =>
                  <Text key={i} style={{fontSize: 11}}>{option.name.ar} - </Text>
              )}
            </React.Fragment>
          : null}
        </View>
      </View>
      {/* <View style={{ flexDirection: 'row' , paddingHorizontal: 5}}>
        <TouchableOpacity onPress={() => Store.updateCardItem(index, 1)} >
          <Icon name='pluscircle' size={18} color={vars.baseColor} />
        </TouchableOpacity>
        <Text style={{marginHorizontal: 10}}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => item.quantity > 1 && Store.updateCardItem(index, -1)} >
          <Icon name='minuscircle' size={18}  color={vars.baseColor}  />
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity onPress={() => Store.removeFromCart(index)} style={{ marginLeft: 15, marginRight: 30 }}>
        <Text style={{ color: vars.baseColor }}>حذف</Text>
      </TouchableOpacity>
    </View>
    );
  }
}



const styles = {
  containerStyle: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imageStyle: {
    borderRadius: 35,
    width: 70, 
    height: 70, 
    marginHorizontal: 10
 },
  textStyle: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 2,
    fontSize:30,
    textAlign: 'center',
    color: '#2e2f30' 
  },
  priceStyle: {
    backgroundColor: '#ddd',
    width: 40,
    alignItems: 'center',
    marginVertical: 5
  },
};



export default CartCard;