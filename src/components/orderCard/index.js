import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Store from '../../config/store';
import {observer} from 'mobx-react/native';

@observer

class OrderCard extends Component {
  componentDidMount(){
    
  }
  getName = (hid) => {
    return Store.products.find(x => x.hid === hid).name.ar
  }
  getUrl = (hid) => {
    return Store.products.find(x => x.hid === hid).image_path
  }
  getOption = (option, i) => {
     const id = Store.modifiers.find(modifier => modifier.options.some(item => item.hid === option)).hid
     const modifier = Store.modifiers.find(modifier => modifier.options.some(item => item.hid === option)).name.ar
     const optionName = Store.modifiers.find(x => x.hid === id).options.find(x => x.hid === option).name.ar
     return <Text key={i} style={styles.sub}>- {modifier} {optionName}</Text>
  }
  getSize = (hid, size) => {
    return Store.products.find(x => x.hid === hid).sizes.find(x => x.hid === size).name.ar
 }

  render() {
    const item = this.props;
    return (
      <View style={styles.row } >
        <Image style={ styles.imageStyle } source={{uri: this.getUrl(item.product_hid)}}/>
        <View style={{flex: 2}}>
          <Text style={styles.textStyle}>{this.getName(item.product_hid)}</Text>
          <View style={{flexDirection: 'row-reverse',}}>
            <Text style={styles.sub}>الحجم {this.getSize(item.product_hid, item.product_size_hid)}</Text>
            {item.options.length > 0 ?
              <React.Fragment>
                {item.options.map((option, i) => this.getOption(option.hid, i) )}
              </React.Fragment>
            : null}
          </View>
        </View>
        <View style={styles.Pr}> 
          <Text style={{}}>X {item.quantity}</Text> 
          <Text style={{textAlign: 'left'  }}>{item.final_price} ريال</Text> 
        </View>
      </View>
    );
  }
}

const styles = {
  row : {
    borderBottomWidth: 2,
    borderColor: '#e2e2e2',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical:10,
    flex: 1
  },
  imageStyle: {
    marginRight: 10,
    marginVertical: 5,
    width: 70, 
    height: 70, 
    borderRadius: 30,
    resizeMode: 'cover',
    borderWidth: 4, 
    borderColor:'white'
  },
  textStyle: {
    paddingRight: 7,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  sub:  {
    paddingRight : 5,
    fontSize:12,
    textAlign: 'right'
  },
  Pr:{
    justifyContent: 'space-around',
    marginLeft: 20
  },
};

export default OrderCard;