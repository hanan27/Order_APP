import React, {Component} from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Icon } from 'native-base';
import { CartCard } from '../../components';
import Store from '../../config/store';
import AuthStore from '../../config/store/auth';
import vars from '../../utils/vars';
import {getTotalPrice} from "../../utils/helpers";
import {observer} from 'mobx-react/native';

@observer
class Cart extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft:
        <TouchableOpacity style={{paddingLeft:9}} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" style={{color:'white'}} />
        </TouchableOpacity>
      });

    checkout = () => {
        if (AuthStore.isLogin)
        this.props.navigation.navigate('Branch')
        else
        Alert.alert('يُرجى تسجيل الدخول أولاً', undefined, [{text: 'موافق'}]);
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                {Store.cart.length > 0 ?
                    <React.Fragment>
                        <View style={{height: '87%'}}>
                        <View style={[styles.containerStyle, styles.shadow]}>
                            <FlatList
                                data={Store.cart}
                                renderItem={({item, index}) => <CartCard item={item} index={index}/>}
                                keyExtractor={(item, index) => item.hid+index}
                                extraData={Store.cart}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        </View>
                        <View style={{flex: 1, height: '15%', justifyContent:'flex-end', alignItems:'center', marginBottom: 30}}>
                            <TouchableOpacity style={styles.btn} onPress={() => this.checkout()}>
                                <Text style={styles.textbtn}>متابعة الطلب {getTotalPrice()} ريال</Text>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                    :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[styles.txt, {marginTop: 15, fontSize: 19}]}>عربة التسوق فارغة</Text>
                    </View>
                }
            </View>
        );
    }
};


const styles = StyleSheet.create({
    containerStyle: {
        margin: 18,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        height: 'auto'
      },
      shadow: {
        shadowColor: "#7d7c7c",
        shadowOffset: {
          width: 10,
          height: 10,
        },  
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 9,
      },
      btn:{
        backgroundColor:vars.baseColor,
        width: 170,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6
      },
      textbtn:{
        color:vars.white,  
        fontSize: 14,
        fontWeight:'bold'
      }
});    



export default Cart;