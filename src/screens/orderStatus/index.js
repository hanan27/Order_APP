import React, { Component } from "react";
import { View, FlatList, Text, TouchableOpacity, ScrollView } from "react-native";
import { OrderList } from '../../components';
import vars from '../../utils/vars';
import secondaryApi from '../../config/secondaryApi';
import { Icon } from 'native-base';
import AuthStore from '../../config/store/auth';
import moment from 'moment';

class OrderStatus extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft:
    <TouchableOpacity style={{paddingHorizontal:15}} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" style={{color:'white'}} />
    </TouchableOpacity>
  });

  constructor() {
    super();
    this.state = {
      loading: true,
      orders: [],
      current: []
    }
  }

  componentDidMount(){
    const id = AuthStore.user.uid;
    secondaryApi.get('/orders/getByUser/'+ id).then(res => {
      const current = res.filter(x => x.date === moment().format('YYYY-MM-DD'))
      const orders = res.filter(x => x.date !== moment().format('YYYY-MM-DD'))
      this.setState({current: current, orders: orders, loading: false})
    }).catch(function(err) {
        console.log('error: ', err);
    });
  }

  _keyExtractor = (item, index) => item.hid;


  render() {
    const { orders, loading, current } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: vars.bgColor}}>
        <View style={styles.headerStyle}>
          <Text style={styles.textstyle}>طلباتي</Text>
        </View>
        {loading ? null :
        <ScrollView>
        {current.length > 0 ||  orders.length > 0 ? 
          <View style={{paddingVertical:10}}>
            {current.length > 0 ?
              <View style={styles.shdw}>
                <Text style={{fontSize:18 ,textAlign:'right', padding:10}}>الطلبات الحالية</Text>
                <FlatList 
                data= {current}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) => 
                  <OrderList
                    id={item.id} 
                    data={item}
                    status={1}
                    navigation={this.props.navigation}
                  />
                }
                /> 
              </View>
            : null }
            {orders.length > 0 ?
              <View  style={styles.shdw }> 
                <Text style={{fontSize:18 ,textAlign:'right',padding:10}}>الطلبات السابقة</Text>
                <FlatList 
                data= {orders}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) => 
                  <OrderList
                    id={item.id} 
                    data={item}
                    status={2}
                    navigation={this.props.navigation}
                  />
                }
                />
              </View>
            : null }
          </View>
        :
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginTop: 15, fontSize: 19}}>لا توجد لديك طلبات سابقة</Text>
        </View>
        }
        </ScrollView>
        }
      </View>
    );
  }
}

const styles = {
  headerStyle: {
    backgroundColor: vars.baseColor,
    alignItems: 'center',
    justifyContent:'center',
    padding:18,
    height: 60, 
  },
  textstyle: {
    fontWeight:'bold',
    color: vars.white,
    fontSize: 20,
  },

shdw: {
    backgroundColor:vars.bgColor,
    marginVertical:10
}
}


export default OrderStatus;
