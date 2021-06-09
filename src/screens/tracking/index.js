import React, {Component} from 'react';
import {StyleSheet,View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import vars from "../../utils/vars";
import { VerticalStep } from '../../components';
import {Icon } from 'native-base';
import Api from '../../config/api';

export default class Tracking extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft:
      <TouchableOpacity style={{paddingHorizontal:15}} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" style={{color:'white'}} />
      </TouchableOpacity> 
  });

  
  constructor(props){
    super(props)
    this.state = {
      refreshing: false,
      id: '',
      status: 0,
      loading: true,
      reference: null
    }
  }
  componentDidMount(){
    const id = this.props.navigation.getParam('id');
    this.setState({id: id})
    Api.get('orders/'+id).then(res => {
      const status = res.order.status
      const ref = res.order.reference
      if (status === 3) this.props.navigation.replace('OrderDetail', {id: id})
      else
      this.setState({status: status, reference: ref, loading: false})
    }).catch(function(err) {
      console.log('error: ', err);
    });
  }

  cancelOrder=()=>{
    Api.post('/orders/' + this.state.id + '/cancel').then(res => {
      console.log(res)
    }).catch(function(err) {
      console.log('error: ', err);
    });
  }

  reference = (val) => {
    if (val === null) return '-'
    else return val
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={ styles.textstyle}>رقم الطلب: {this.reference(this.state.reference)}</Text>
        </View>
        {this.state.loading ? null :
        <React.Fragment>
          <Text style={styles.Txt}> حالة الطلب </Text>
          <View style={styles.Items}>
            <VerticalStep status={this.state.status}></VerticalStep>
          </View>

          <View style={{justifyContent:'center', alignItems:'center',flexDirection:'row'}}>
            <TouchableHighlight style={styles.cancleBtn} onPress={()=>this.cancelOrder()}>
              <Text style={styles.textbtn}>إلغاء الطلب</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.cancleBtn}
              onPress={()=>this.props.navigation.navigate('OrderDetail', {id:this.state.id})}
            >
              <Text style={styles.textbtn}>ملخص الطلب</Text>
            </TouchableHighlight>
          </View>
        </React.Fragment>
         }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.bgColor
  },
  headerStyle: {
    backgroundColor: vars.baseColor,
    alignItems: 'center',
    justifyContent:'center',
    padding:18,
    height: 90, 
    borderBottomLeftRadius: 70, 
    borderBottomRightRadius: 70,
  },
  Items:{
    height:"50%",
    width:"100%",
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    direction: "rtl", 
    backgroundColor:vars.bgColor, 
    paddingHorizontal:20,
  },
  Txt:{
    marginTop:15,
    fontWeight:'bold',
    fontStyle:'italic',
    textShadowColor:15,
    fontSize:20,
    alignSelf:'center',
    color: vars.txtColor,
      
  },
  textstyle: {
    marginTop: 5,
    fontWeight:'bold',
    color: vars.white,
    fontSize: 16,
    padding:2
  },
  cancleBtn:{
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor:vars.baseColor,
    width:150,
    height:60,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
    margin:6
  },
  textbtn:{
    color:vars.white,  
    fontSize: 16,
    fontWeight:'bold'
  }
  
})