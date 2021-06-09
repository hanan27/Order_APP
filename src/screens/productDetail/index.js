import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/AntDesign';
import { View, Text, Image, TouchableOpacity, Vibration } from 'react-native';
import styles from './styles';
import Rating from './rating';
import Api from '../../config/api';
import vars from '../../utils/vars';
import Store from '../../config/store';
import FlashMessage, { showMessage } from "react-native-flash-message";

class ProductDetail extends Component {
  
  constructor() {
    super();
    this.state = {
      checked: [], 
      options: [],
      options_price: 0,
      original_price: 0,
      final_price: 0,
      discount: 0,
      active: '',
      loading: true,
      data: {},
      count: 1,
      total: 0,
    }
  }

  componentWillMount() {
    const id = this.props.navigation.getParam('id');
    Api.get('/products/' + id).then(res => {
      this.setState({ 
        data: res.product, 
        active: res.product.sizes[0], 
        original_price: res.product.sizes[0].price, 
        loading: false 
      },  () => {this.finalPrice();})
    }).catch(function (err) {
      console.log('error: ', err);
    });
  }

  IncrementItem = () => {
    this.setState(prevState => {
      return { count: prevState.count + 1 }
    },  () => {this.finalPrice();})
  }

  DecreaseItem = () => {
    this.state.count > 1 && this.setState(prevState => {
      return { count: prevState.count - 1 }
    },  () => {this.finalPrice();})
  }

  checkItem = (item, id, price) => {
    const { checked, options_price, options } = this.state;

    if (!checked.includes(id)) {
      this.setState({ checked: [...checked, id], options_price: options_price + price, options: [...options, item] },  () => {this.finalPrice();});
    } else {
      this.setState({ checked: checked.filter(a => a !== id), options_price: options_price - price, options: options.filter(a => a !== item) },  () => {this.finalPrice();});
    }
  }; 

  finalPrice = () => {
    const { count, options_price, original_price, discount } = this.state;
    this.setState({
      final_price : count * (original_price + options_price - discount)
    })
  }

  add = () => {
    const { data, count, options, original_price, final_price, active } = this.state;
    const obj = {quantity: count, options: options, original_price: original_price, final_price: final_price, size: active};
    Object.assign(data, obj); 
    Store.addToCart(data)
    showMessage
  }  

  fCombine = () =>{
    this.add();
    showMessage({
      message: "تمت اضافة طلبك",
      backgroundColor: 'grey',
      icon: 'success',
      duration:880,
    })
    //  const DURATION = 90000;
    // Vibration.vibrate(DURATION);
  }


  render() {
    // console.log(this.state.active)
    const { data, count } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: vars.baseColor, height: 120, borderBottomLeftRadius: 70, borderBottomRightRadius: 70, }}></View>
        <View style={{ height: 50, }}></View>
        {this.state.loading ? null :
          <React.Fragment>
            <View style={styles.card}>
              <View style={styles.header} >
                <View style={{ }}>
                  <Text style={styles.productName}>  {data.name.ar}  </Text>
                  <Rating productId={data.hid}/>
                  {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate('Comment')}><Text>تقييم</Text></TouchableOpacity> */}
                  <Text style={{ paddingTop: 10 }}>{this.state.active.calories} سعرة حرارية</Text>
                </View>

                <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                  <Image style={styles.productImage} source={{ uri: data.image_path }} />
                </View>
              </View>
            </View>
            <Text style={styles.description}> {data.description.ar}</Text>
            <View style={styles.ViewSize}>
              {data.sizes.map((size, i) =>
                <TouchableOpacity key={i} style={this.state.active === size ? styles.btnActive : styles.btnSize}
                  onPress={() => this.setState({ active: size, original_price: size.price }, () => {this.finalPrice();})} >
                  <Text style={this.state.active === size ? styles.SelectTextSize : styles.TextSize}>{size.name.ar}</Text>
                </TouchableOpacity>
              )}
            </View>

            {data.modifiers.length > 0 ?
              <React.Fragment>
                {data.modifiers.map((modifier, i) =>
                  <React.Fragment key={i}>
                    <Text style={styles.titleText1}> {modifier.name.ar} :</Text>
                    {modifier.options.map((option, i) =>
                      <CheckBox
                        checkedColor={vars.baseColor} right iconRight
                        colorb={vars.baseColor} key={i}
                        title={option.name.ar + '    ' + option.price + '.0 ريال'} 
                        onPress={() => {this.checkItem(option, option.hid, option.price)}}
                        checked={this.state.checked.includes(option.hid)}
                      />
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
              : null}

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 36, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' , padding:10,}}>
              < TouchableOpacity onPress={this.IncrementItem} >
                  <Icon name='pluscircle' size={25} color={vars.baseColor} />
                </TouchableOpacity>

                <Text style={{   marginLeft:15 ,marginRight:15, marginTop:5, }}>{count}</Text>

                <TouchableOpacity onPress={this.DecreaseItem} >
                  <Icon name='minuscircle' size={25}  color={vars.baseColor}  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.addbtn} onPress={() => this.fCombine()}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.price}> {this.state.final_price} ريال</Text>
                  <Text style={styles.textbtn}>إضافة</Text>
                </View>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        }
        <FlashMessage  position="center"></FlashMessage>
      </View>
    )
  }
}


export default ProductDetail;