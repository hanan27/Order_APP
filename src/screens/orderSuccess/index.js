import React, {Component} from 'react';
import {View, AsyncStorage, Text, Image} from 'react-native';
import vars from "../../utils/vars";
import Store from '../../config/store';

class OrderSuccess extends Component {
    componentDidMount() {
        Store.setCart([]);
        Store.resetCartCount();
        AsyncStorage.multiRemove(['@cart', '@cartCount']);
        setTimeout(() => {
            this.props.navigation.navigate('Main');
        }, 1500);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: vars.bgColor}}>
                <Text style={{color: vars.baseColor, fontSize: 28}}>
                    تم استلام الطلب
                </Text>
                {/* <Text style={{color: vars.baseColor, fontSize: 28}}>
                    تمت عملية الدفع بنجاح
                </Text> */}
                <Image source={require('../../assets/images/success-icon.png')} 
                style={{width: 45, height: 45, marginTop: 25, tintColor: vars.baseColor}} />
            </View>
        );
    }
}

export default OrderSuccess;