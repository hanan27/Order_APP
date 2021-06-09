import React, {Component} from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Icon } from 'native-base';
import Store from '../../config/store';
import {getTotalPrice} from "../../utils/helpers";
import {observer} from 'mobx-react/native';
import Api from '../../config/api';
import vars from '../../utils/vars';

@observer
class Checkout extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft:
        <TouchableOpacity style={{paddingLeft:9}} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" style={{color:'white'}} />
        </TouchableOpacity>
      });
    
    constructor() {
        super();
        this.state = {
            amount: 0,
            discount: 0,
            cities: []
        }
    }

    option = (arr, quantity) => {
        const options = [];
        arr.map(option => {
            options.push({
                hid: option.hid,
                quantity: 1,
                original_price: option.price,
                final_price: option.price * quantity
            })
        });
        return options;
    }

    proceed = () => {
        const products = []; 
        const {amount} = this.state;
        Store.cart.map(product => {
            products.push({
                product_hid: product.hid,
                product_size_hid: product.size.hid,
                quantity: product.quantity,
                original_price: product.original_price,
                final_price: product.final_price,
                options: this.option(product.options, product.quantity)
            });
        });
        const order = {
            branch_hid: '_52791d67',
            price: getTotalPrice(),
            final_price: getTotalPrice() + amount,
            total_tax: amount,
            type: 2,
            products: products,
            coupon_code: '189634',
            taxes: [{
                hid: "_6d746a73",
                amount: amount
            }]
        }
        // console.log(order)
        // Api.post('/orders', order)
        // .then(res => {
        //     console.log(res)    
        // }).catch(function (err) {
        //     console.log('error: ', err);
        // });
    }

    subtotal = () => {
        let tax = 0;
        Store.cart.map(product => {
            product.taxable ? tax= tax + (product.original_price * product.quantity) : null
            product.options.map(option => {
                option.taxable ? tax= tax + (option.price * product.quantity) : null
            })
        })
        this.setState({amount: tax * 0.05},  () => {this.proceed()})
    }

    componentDidMount(){
        Api.get('/branches').then(res => {
            this.setState({cities: res.cities})
        }).catch(function(err) {
            console.log('error: ', err);
        });
        Api.get('/coupons?filters[code]=398534').then(res => {
            if (res.coupons.length > 0){
                res.coupons[0].is_active && !res.coupons[0].is_used ? 
                this.setState({discount: res.coupons[0].value}) :
                Alert.alert('Coupon expired');
            } else
            Alert.alert('Coupon does not exist');
        }).catch(function(err) {
            console.log('error: ', err);
        });
        this.subtotal()
        // console.log(getBranches())
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: vars.bgColor,borderRadius: 30, margin: 10,flexDirection:'column' }}>
                <TouchableOpacity style={styles.btn} onPress={() => this.subtotal()}>
                    <Text style={styles.textbtn}>تأكيد الطلب  {getTotalPrice()} + {this.state.amount} - {this.state.discount} ريال</Text>
                </TouchableOpacity>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    
});    



export default Checkout;