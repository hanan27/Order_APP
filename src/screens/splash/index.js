import React, {Component} from 'react';
import {View, Image, AsyncStorage} from 'react-native';
import vars from "../../utils/vars";
import Store from '../../config/store';
import Api from '../../config/api';
import {getCachedCart} from "../../utils/helpers";

class Splash extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        Api.get('/products').then(res => Store.setProducts(res.products));
        setTimeout(() => this.props.navigation.replace('Main'), 1500);
        getCachedCart();
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: vars.bgColor}}>
                
            </View>
        )
    }
}

export default Splash;