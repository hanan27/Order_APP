import React, {Component}from 'react';
import { StyleSheet, Text, View, ImageBackground, Alert, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {Icon } from 'native-base';
import vars from '../../utils/vars';
import { LinearGradient } from 'expo-linear-gradient';
import secondaryApi from '../../config/secondaryApi'
import * as firebase from 'firebase';

const {width: WIDTH} = Dimensions.get('window')
const GradientBtn = ({ name }) => (
  <LinearGradient colors={ [vars.baseColor, 'rgba(237, 67, 103, 1)']} style={{borderRadius: 20, width:200 , height: 50, justifyContent:'center'}}>
     <Text style={styles.btn}>{name}</Text>
  </LinearGradient>
)

export default class Signup extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft:
    <TouchableOpacity style={{paddingLeft:9}} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" style={{color:'white'}} />
    </TouchableOpacity>
  });

  constructor() {
    super()
    this.state = {
      showPass: true,
      press: false,
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: '',
      displayName: ''
    }
    this.validatePhone = this.validatePhone.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }
  showPass= () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true})
    } else {
      this.setState({ showPass: true, press: false})
    }
  }

  onSignupPress = () => {
    const {phoneNumber, displayName} = this.state;
    const {navigation} = this.props;
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      var user = firebase.auth().currentUser; 
      const data = {uid: user.uid, phoneNumber: phoneNumber, displayName: displayName}
      secondaryApi.post('/auth/update', data).then(res => {
        console.log(res)
      }).catch(function(err) {
          console.log('error: ', err);
      });
     }, (error) => { Alert.alert(error.message); });
    navigation.navigate('Main')
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    this.setState({ emailValid });
    return emailValid;
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 6;
    this.setState({ passwordValid });
    return passwordValid;
  }

  validatePhone() {
    const { phoneNumber } = this.state;
    const reg = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    const phoneValid = reg.test(phoneNumber)
    this.setState({ phoneValid });
    return phoneValid;
  }
  
  render(){
    return (
        // <ImageBackground source={require('../../assets/images/BK.jpeg')}  imageStyle= {{opacity:0.4}} 
        // style={{width: '100%', height: '100%'}}>
      <View>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={{color:'black', fontSize:30, fontWeight:'bold', paddingTop:20}}>حساب جديد</Text>
          <View style={{flexDirection:'column', justifyContent:'flex-end', alignItems:'center', paddingTop:25}}>
            <View style={styles.inputContainer}> 
              <Text style={styles.txt}>الاسم</Text>
              <TextInput
                style={styles.input}
                onChangeText={(displayName) => this.setState({displayName})}
                value={this.state.displayName}
              />
            </View>

            <View style={styles.inputContainer}> 
              <Text style={styles.txt}>البريد الالكتروني</Text>
              <TextInput
                style={styles.input}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.txt}>الرقم السري</Text>
                <View style={{flexDirection:'row' , alignItems:'flex-start', justifyContent:'center'}}>
                  <TouchableOpacity onPress={this.showPass.bind(this)}>
                    <Icon name={this.state.press == false ? 'eye': 'eye-off' } style={styles.btnEye}/>
                  </TouchableOpacity>
                  <TextInput 
                    style={styles.input}  
                    secureTextEntry={this.state.showPass}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                  />
                </View>
            </View>

            <View style={styles.inputContainer}> 
              <Text style={styles.txt}>رقم الجوال</Text>
              <TextInput
                style={styles.input}
                onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                value={this.state.phoneNumber}
              />
            </View>
          </View>
          <View style={{marginTop:15}}>
            <TouchableOpacity onPress={this.onSignupPress}>
                <GradientBtn name="تسجيل"  />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row' , justifyContent:'center', paddingTop:20}}>
            <TouchableOpacity style={{textAlign: 'center'}}>
              <Text style={{color:vars.baseColor, fontWeight:'bold', paddingRight:5}}>سجل الدخول</Text>
            </TouchableOpacity>
            <Text>هل لديك حساب؟</Text>
          </View>
        </KeyboardAvoidingView>
     </View> 
    //  </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   justifyContent:'center',
   alignItems:'center',
   marginTop:25,
  },
  overlay: {
    backgroundColor:'rgba(255,0,0,0.5)',
},
  input: {
    width: WIDTH - 55,
    height: 45,
    fontSize: 16,
    paddingLeft:45,
    backgroundColor: 'white',
    borderRadius:15,
    opacity: 0.6
  } ,
  inputContainer: {
    marginTop:20,
    padding: 7,
    marginHorizontal: 20,
  },
  btnEye: {
    position: 'absolute',
    color: 'gray',
    padding:7
  },
  txt: {
    textAlign:'right',
    paddingBottom:6
  },
  btn:{
    alignSelf:'center',
    color: 'white',
    fontSize:18,
  }
});