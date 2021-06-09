import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import vars from "../../utils/vars";
import {Icon} from 'native-base';
import Store from '../../config/store';
import {observer} from 'mobx-react/native';


const sheight = Dimensions.get('screen').height;
const swidth = Dimensions.get('screen').width;

@observer

class OrderList extends Component {
  getBranch = (hid) => {
    return Store.branches.find(x => x.hid === hid).name.ar
  }

  render() {
    const { data, status } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} 
        onPress={() => {status === 1 ? this.props.navigation.navigate('Tracking', {id: data.hid}) : this.props.navigation.navigate('OrderDetail', {id: data.hid})}}
        >
          <View >
            <Icon name="calendar"  size= {15} style={styles.img}/>
            <Text style= {styles.txt}>{data.date}</Text>
          </View>

          <View >
            <Icon name="pin" size= {15} style={styles.img}/>
            <Text style= {styles.txt}>{this.getBranch(data.branch)}</Text>
          </View>

          <View>
            <Icon name="cash" size= {15} style={styles.img}/>
            <Text style= {styles.txt}>{data.price}</Text>
          </View>

          {/* <View >
          <Icon name="paper" size= {10} style={styles.img}/>
            <Text style= {styles.txt}>{data.status}</Text>
          </View> */}
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: swidth,
  },
 
  txt:{
    fontSize:13,
    paddingTop:10
  },
  btn: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: vars.white,
    width: swidth- 20,
    height: 90,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 2.22,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around'
  },
  img: {
    alignSelf:'center',
    color:vars.baseColor
  }
});

export default OrderList;