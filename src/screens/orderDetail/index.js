import React, {Component} from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import vars from '../../utils/vars';
import { OrderCard } from '../../components';
import Api from '../../config/api';
import { Icon } from 'native-base';

class OrderDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft:
    <TouchableOpacity style={{paddingHorizontal:15}} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" style={{color:'white'}} />
    </TouchableOpacity>
  });

  constructor() {
    super();
    this.state = {
      checked : false,
      active : false,
      loading: true,
      data: {},
    }
  }

  componentWillMount() {  
    const id = this.props.navigation.getParam('id');
    Api.get('/orders/' + id).then(res => {
      console.log(res.order)
        this.setState({data: res.order, loading: false})
    }).catch(function(err) {
        console.log('error: ', err);
    });
  }

  status = (value) => {
    switch(value) {
      case 1:
        return 'تم استلام الطلب'
      case 2:
        return 'قيد التجهيز'
      case 3:
        return 'تم الالغاء'
      case 4:
        return 'مكتمل'
    }
  }

  orderNo = (val) => {
    if (val === null) return '-'
    else return val
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}> 
        <View style={styles.headerStyle}>
          <Text style={ styles.textstyle}> رقم الطلب: <Text>{this.orderNo(data.reference)}</Text> </Text>
          <Text style={ styles.textstyle }>تاريخ الطلب: {data.created_at} </Text>
          <Text style={styles.textstyle}>حالة الطلب: <Text>{this.status(data.status)}</Text> </Text>
        </View>
        <FlatList
        data={data.products}
        renderItem={({item}) => <OrderCard { ... item}/>}
        keyExtractor={(item) => item.hid}
        />
        <View style={styles.containerStyle} >
          <View style={styles.detail} > 
            <Text style={styles.txt} > ملخص الطلب  </Text>  
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {flex: 2, textAlign: 'left'}]}> طريقة الدفع : </Text>
            <Text style={[styles.text, {textAlign: 'right'}]}>كاش</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {flex: 2, textAlign: 'left'}]}> قيمة الطلب : </Text>
            <Text style={[styles.text, {textAlign: 'right'}]}>{data.price}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {flex: 2, textAlign: 'left'}]}>الخصم:</Text>
            <Text style={[styles.text, {textAlign: 'right'}]}>{data.discount_amount}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {flex: 2, textAlign: 'left'}]}> المبلغ الاجمالي :  </Text>
            <Text style={[styles.text, {textAlign: 'right'}]}>{data.final_price}</Text>
          </View>
        </View>
      </View>
    );
  }
};


const styles = {
  headerStyle: {
    backgroundColor: vars.baseColor,
    alignItems: 'center',
    justifyContent:'center',
    padding:18,
    height: 130, 
    borderBottomLeftRadius: 70, 
    borderBottomRightRadius: 70,
  },
  container: {
    flex: 1,
    backgroundColor: vars.bgColor
  },
  textstyle: {
    marginTop: 5,
    fontWeight:'bold',
    color: '#faf0e6',
    fontSize: 16,
    padding:2
  },
  containerStyle: {
    paddingLeft:10,
    paddingRight:10,
    direction:'rtl',
    alignItems: 'flex-start',
    backgroundolor: vars.bgColor,
    Color :vars.txtColor,
  },
  text: {
    fontSize: 15,
    color: vars.txtColor,
    paddingRight: 10,
  },
  txt: {
    paddingLeft:10,
    fontSize: 18,
    marginTop:15,
    color: vars.baseColor,
  },
  detail: {
    width: '100%', 
    height: '20%', 
    backgroundColor: '#e2e2e2',
    marginBottom: 10, 
    marginTop: 5, 
    direction: 'rtl',
    alignItems: 'flex-start'
  }
};



export default OrderDetail;