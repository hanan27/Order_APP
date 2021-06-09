import React from 'react';
import {AsyncStorage, TouchableOpacity, Image, View} from 'react-native';
import AuthStore from '../config/store/auth';
import Store from '../config/store';
import Api from '../config/api';
import vars from './vars';
import sharedStyles from "./sharedStyles";

export function post(url, data, success, error) {
    console.log({userId: AuthStore.user._id, ...data});
    Api.post(url, {userId: AuthStore.user._id, ...data})
        .then(res => success(res))
        .catch(err => {
            error && error(err);
            console.log(err);
        });
}

export function get(url, success, error) {
    const u = url + '/' + AuthStore.user._id;
    Api.get(u)
        .then(res => success(res))
        .catch(err => {
            error && error(err);
            console.log(err);
        });
}

export function cacheCart(cart, cartCount) {
    AsyncStorage.setItem('@cart', JSON.stringify(cart));
    AsyncStorage.setItem('@cartCount', cartCount.toString());
}

export function getCachedCart() {
    AsyncStorage.multiGet(['@cart', '@cartCount']).then(data => {
        if (data[0][1]) Store.setCart(JSON.parse(data[0][1]));
        if (data[1][1]) Store.setCartCount(parseInt(data[1][1]));
    });
}

export function getTotalPrice() {
    return Store.cart.map(x => {
        return x.final_price
    }).reduce((a, b) => a + b, 0)
}

export function renderStar(val) {
    const stars = [];
    for (let i = 0; i < val; i++) {
        stars.push(i);
    }
    return (
        <View style={sharedStyles.stars}>
            {/* {stars.map(star => <Image source={require('../assets/images/yellow-star.png')} style={{width: 30, height: 30, margin: 5}} key={star} />)} */}
        </View>
    )
}