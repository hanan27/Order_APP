import React, {Component} from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView, Alert, TextInput, Button } from 'react-native';
import vars from '../../utils/vars';
import { InvoiceCard } from '../../components';
import { Icon } from 'native-base';
import Store from '../../config/store';
import {getTotalPrice} from "../../utils/helpers";
import Api from '../../config/api';
import secondaryApi from '../../config/secondaryApi';
import AuthStore from '../../config/store/auth';
import moment from 'moment';

class Invoice extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft:
        <TouchableOpacity style={{ paddingLeft: 9 }} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" style={{ color: 'white' }} />
        </TouchableOpacity>
    });

    constructor() {
        super();
        this.state = {
            loading: true,
            keyValidate: false,
            tax: 0,
            discount: 0,
            total: 0,
            coupon: '',
            branch: '',
            due_time: '',
            type: 0
        }
        this.copoun = React.createRef();
    }

    componentDidMount(){
        this.setState({
            branch: this.props.navigation.getParam('branch_hid'),
            due_time: this.props.navigation.getParam('due_time'),
            type: this.props.navigation.getParam('type')
        })
        this.subtotal()
    }

    validate(coupon){
        const {tax} = this.state;
        Api.get('/coupons?filters[code]=' + coupon).then(res => {
            if (res.coupons.length > 0){
                if (res.coupons[0].is_active && !res.coupons[0].is_used) {
                    const nontaxable = getTotalPrice() - tax;
                    console.log(nontaxable - res.coupons[0].value )
                    const remaining = nontaxable - res.coupons[0].value 
                    if (remaining >= 0) {
                        this.setState({
                            discount: res.coupons[0].value,
                            keyValidate: true,
                            total: getTotalPrice() - res.coupons[0].value + (tax * 0.05)
                        }) 
                    }
                    else {
                        console.log(tax, tax + remaining)
                        this.setState({
                            discount: res.coupons[0].value,
                            keyValidate: true,
                            tax: tax + remaining,
                            total: getTotalPrice() - res.coupons[0].value + ((tax  + remaining) * 0.05)
                        }) 
                    }
                }
                else {
                    this.setState({keyValidate: false, discount: 0})
                    Alert.alert('Coupon expired');
                }
            } else {
                Alert.alert('Coupon does not exist'); this.setState({keyValidate: false, discount: 0})
            }
        }).catch(function(err) {
            console.log('error: ', err);
        });
    }

    subtotal = () => {
        let tax = 0;
        Store.cart.map(product => {
            product.taxable ? tax= tax + (product.original_price * product.quantity) : null
            product.options.map(option => {
                option.taxable ? tax= tax + (option.price * product.quantity) : null
            })
        })
        this.setState({tax: tax, total: getTotalPrice() + (tax * 0.05)})
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
        const {tax, total, branch, due_time, type, coupon, keyValidate} = this.state;
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
            branch_hid: branch,
            due_time: due_time,
            type: type,
            price: getTotalPrice(),
            final_price: total,
            total_tax: tax * 0.05,
            type: 2,
            products: products,
            taxes: [{
                hid: "_6d746a73",
                amount: tax * 0.05
            }]
        }
        if (keyValidate) Object.assign(order, {coupon_code: coupon});
        console.log(order)
        Api.post('/orders', order)
        .then(res => {
            console.log(res) 
            const data = {date: moment().format('YYYY-MM-DD'), branch: branch, price: total, userId: AuthStore.user.uid, hid: res.order_hid}
            secondaryApi.post('/orders/create', data).then(res => {
                console.log(res)    
            }).catch(function (err) { console.log('error: ', err); });
            this.props.navigation.navigate('OrderSuccess');   
        }).catch(function (err) {
            console.log('error: ', err);
        });
    }


    render() {
        return (
                <ScrollView style={styles.container}>
                    <FlatList
                        data={Store.cart}
                        renderItem={({ item }) => <InvoiceCard {...item} />}
                        keyExtractor={(item, index) =>  item.hid + index}
                    />
                    <View style={styles.recietContainer}>
                        <View style={styles.detail} > 
                            <Text>الكوبون</Text>
                        </View>
                        <View style={{flexDirection:'row-reverse', justifyContent:'space-between', padding:5,}}>
                            <TextInput 
                                style={styles.input}
                                onChangeText={(text)=> this.setState({coupon: text})}
                                placeholder="كوبون الخصم"
                                keyboardType={'numeric'}
                                maxLength={6} 
                            /> 
                            <View style={{marginTop: 5, marginHorizontal:5}}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={{ fontSize: 15, color: 'white', textAlign: "center" }}> تم </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.recietContainer} >
                        <View style={styles.detail} >
                            <Text  >ملخص الطلب</Text>
                        </View>
                        <View style={styles.prices}>
                            <Text >قيمة الطلب :</Text>
                            <Text >{getTotalPrice()}</Text>
                        </View>
                        <View style={styles.prices}>
                            <Text >الخصم:</Text>
                            <Text >{this.state.discount}</Text>
                        </View>
                        <View style={styles.prices}>
                            <Text >المبلغ بعد الخصم:</Text>
                            <Text >{getTotalPrice() - this.state.discount}</Text>
                        </View>
                        <View style={styles.prices}>
                            <Text >المبلغ الخاضع للضريبة :</Text>
                            <Text >{this.state.tax}</Text>
                        </View>
                        <View style={styles.prices}>
                            <Text >الضريبة :</Text>
                            <Text >{(this.state.tax * 0.05).toFixed(2)}</Text>
                        </View>
                        <View style={styles.prices}>
                            <Text>المبلغ الاجمالي :</Text>
                            <Text>{this.state.total}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent:'flex-end', alignItems:'center', margin: 20}}>
                        <TouchableOpacity style={styles.btn} onPress={() => this.proceed()}>
                            <Text style={styles.textbtn}>إتمام الطلب </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
    
        );
    }
};


const styles = {
    container: {
        padding:8,
        flex:1,
        flexDirection:'column',
        backgroundColor: vars.bgColor
    },
    recietContainer:{
        margin:5,
    },
    detail: {
        backgroundColor: '#e2e2e2',
        padding:5,
        alignItems: 'flex-end',
        borderRadius:15,
    },
    prices: {
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        paddin:1,
        margin:2,
    },
    input:{
        width:120,
        height:50,
        flexDirection:'row',
        color:"black",
    },
    btn:{
        backgroundColor:vars.baseColor,
        width: 170,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        alignSelf: 'center'
        },
    textbtn:{
        color:vars.white,  
        fontSize: 14,
        fontWeight:'bold'
    },
    button: {
        backgroundColor:vars.baseColor,
        padding: 10,
        borderRadius:15,
        width:60
    },
};



export default Invoice;