import React, { Component } from 'react';
import { StyleSheet,Text,View,TouchableOpacity , Image } from 'react-native';

import Swiper from 'react-native-swiper';

export default class SignInHome extends Component {
  render(){
    return (
      <View>
        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            {/* <Image source={require('../../assets/images/order1.jpg')}
            style={{width:250, height:200}}></Image> */}
          </View>
          <View style={styles.slide2}>
            <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qBTBfBoGg2S6jfhSRrHfJK8tA3OFMur3Wprmglnv8g2Upr4D'}} 
            style={{width:250, height:200}}></Image>
          </View>
          <View style={styles.slide3}>
            <Image source={{uri:'http://tzgorahovica.hr/wp-content/uploads/2018/12/itunes.png'}} 
            style={{width:250, height:200}}></Image>
          </View>
        </Swiper>
        <View style={{justifyContent: 'center', alignItems:'center'}}>
          <TouchableOpacity>
            <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSfgL8eaGK4TyWZRQiISAC6o_3WQH4RgAh-CTbVf-hOepTMx1O'}}
            style={styles.img1}></Image>
            <Text style={styles.lo1}>  تسجيل الدخول </Text>
          </TouchableOpacity>
          <TouchableOpacity> 
            <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSfgL8eaGK4TyWZRQiISAC6o_3WQH4RgAh-CTbVf-hOepTMx1O'}}
                  style={styles.ima}></Image>
            <Text style={styles.la}> حساب جديد </Text>
          </TouchableOpacity>
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  slide1: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  'white',
  },
  slide2: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide3: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  img: {
    width: 325,
    height: 55,
    borderRadius: 15,
    marginTop:70
  },
  img1: {
    width: 325,
    height: 60,
    borderRadius: 15,
    marginTop:40,
  },
  lo1: {
    marginTop: -40,
    marginLeft: 105,
    fontSize:20,
    fontWeight:'bold',
    color: 'white'
  },
  ima: {
    width:325,
    height:60,
    borderRadius: 15,
    marginTop: 40
  },
  la: {
    fontSize: 20,
    color:'white',
    marginBottom: 30,
    marginTop: -40,
    marginLeft: 115,
    fontWeight:'bold'
  },
})