import React, {Component}from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import vars from '../../utils/vars';
import { Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import AuthStore from '../../config/store/auth';

const {width: WIDTH} = Dimensions.get('window')
const GradientBtn = ({ name }) => (
  <LinearGradient colors={ [vars.baseColor, 'rgba(237, 67, 103, 1)']} style={{borderRadius: 20, width:200, height: 50, justifyContent:'center'}}>
     <Text style={styles.btn}>{name}</Text>
  </LinearGradient>
)

export default class Login extends Component {
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
    }
  }

  showPass= () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true})
    } else {
      this.setState({ showPass: true, press: false})
    }
  }

  onLoginPress = () => {
    const {navigation} = this.props;
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      const data = firebase.auth().currentUser;
      AuthStore.loginSuccess(data);
      navigation.navigate('Main')
     }, (error) => { Alert.alert(error.message); });
  } 
  

  render(){
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={{color:'black', fontSize:30, fontWeight:'bold', marginTop: 70}}>تسجيل الدخول</Text>
          <View style={styles.inputContainer}> 
            <Text style={styles.txt}>البريد الإلكتروني </Text>
            <TextInput 
            style={styles.input} 
            value={this.state.email}
            onChangeText={(text) => { this.setState({email: text}) }}
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
                value={this.state.password}
                onChangeText={(text) => { this.setState({password: text}) }}
              />
            </View>
          </View>
          <View style={{marginTop:15}}>
            <TouchableOpacity onPress={this.onLoginPress}>
              <GradientBtn name="تسجيل الدخول" />
            </TouchableOpacity>
          </View>
          {/* <View style={{flexDirection:'row' , justifyContent:'center', margin:10}}>
            <TouchableOpacity style={{textAlign: 'center'}}>
              <Text style={{color:vars.baseColor, fontWeight:'bold', paddingRight:5}}>سجل الآن</Text>
            </TouchableOpacity>
            <Text>حساب جديد ؟</Text>
          </View> */}
          <View style={{flexDirection:'row', justifyContent:'center', margin:10}}>
            <TouchableOpacity>
              <Text style={{color:vars.baseColor, fontWeight:'bold'}}>اضغط هنا </Text>   
            </TouchableOpacity>
            <Text> هل نسيت الرقم السري؟ </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
          
         
    );
  }
}


const styles = StyleSheet.create({
  container: {
   flex:1,
   backgroundColor:vars.bgColor,
   justifyContent:'flex-start',
   alignItems:'center'
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
  txt:{
    textAlign:'right',
    paddingBottom:6
  },
  btn:{
    alignSelf:'center',
    color: 'white',
    fontSize:18,
  }
});

