import React, {Component} from 'react';
import {StyleSheet,View, Text, Image ,Modal, TouchableOpacity,TouchableHighlight, Dimensions, TextInput} from 'react-native';
import vars from "../../utils/vars";
import {Icon} from 'native-base';
import * as firebase from 'firebase';
import AuthStore from '../../config/store/auth';

const sHeight=  Dimensions.get('screen').height;
const sWidth=  Dimensions.get('screen').width;

class Profile extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft:
        <TouchableOpacity style={{paddingLeft:9}} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" style={{color:'white'}} />
        </TouchableOpacity>
      });
      
    constructor(props) {
        super(props);
        this.state = {
            name: 'الاسم',
            pass:'',
            newPass:'',
            phone:'',
            email:'',
            ModalVisibleStatus: false 
        };
    }

    componentDidMount(){

    }
     
    ShowModalFunction(visible) {
        this.setState({ModalVisibleStatus: visible});
    }

    render() {
        return (
            <View style={{width: sWidth, height: sHeight, flex: 1 , backgroundColor:vars.bgColor}}>
                <View style={styles.slide1}>
                    <Image source={{uri: 'https://i0.wp.com/zblogged.com/wp-content/uploads/2019/02/FakeDP.jpeg?resize=567%2C580&ssl=1'}}
                     style={styles.img}/>
                    <Text style={styles.text}>{AuthStore.user.displayName}</Text> 
                </View>

                <View style={{flex:2, marginTop:20}}>
        
                <View style ={styles.userinfo}> 
                    <TextInput 
                        editable={false} 
                        style={styles.txt}
                        value={AuthStore.user.phoneNumber}
                    />
                    <Icon name= "call" style={styles.Icon} />
                </View> 

                <View style ={styles.userinfo}> 
                    <TextInput editable={false} style={styles.txt} value={AuthStore.user.email}/>
                    <Icon name="mail" style={styles.Icon}/>
                </View> 

                {/* <View style ={styles.userinfo}>   
                    <TextInput editable={false} style={styles.txt}>
                    العنوان</TextInput>
                    <Icon name="pin" style={styles.Icon}/>
                </View>  */}
            </View>

            <View style={{marginBottom: 10, justifyContent:'center', alignItems:'center',flexDirection:'row'}}>
                <TouchableHighlight style={styles.cancleBtn} onPress={() => { this.ShowModalFunction(true) }}>
                    <Text style={styles.textbtn}>تعديل ملفي</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.cancleBtn}>
                    <Text style={styles.textbtn}>تسجيل الخروج</Text>
                </TouchableHighlight>
            </View>

          <Modal
          transparent={true} animationType={"slide"}

          visible={this.state.ModalVisibleStatus}

          onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >


            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.ModalInsideView}>
            <TextInput  style={styles.textTnputModal} placeholder={'الاسم'}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}>

            </TextInput>
                <TextInput  style={styles.textTnputModal} placeholder={' كلمة المرور القديمة'}
                returnKeyType={'next'} secureTextEntry={true}>
                 </TextInput>
                <TextInput  style={styles.textTnputModal} placeholder={' كلمة المرور الجديدة'}
                returnKeyType={'next'} secureTextEntry={true}>
                </TextInput>
                <TextInput  style={styles.textTnputModal} placeholder={'رقم الجوال'}
                keyboardType={'phone-pad'} returnKeyType={'next'}
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}>
                 </TextInput>
                <TextInput  style={styles.textTnputModal} placeholder={' البريد الالكتروني'}
                keyboardType={'email-address'} returnKeyType={'done'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}></TextInput>
 
           

            <TouchableHighlight style={styles.cancleBtn} onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} }>
                <Text style={styles.textbtn} >حفظ</Text>
            </TouchableHighlight>
           
            </View>
            </View>


            </Modal>  
           
        </View>
    );
  }
}

const styles = StyleSheet.create({
  
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: vars.baseColor,
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70
    
    },
    userinfo:{
        flexDirection:'row' ,
        marginVertical:20,
        marginHorizontal:15,
        justifyContent:'center'
    },
    text:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 5,
        marginBottom: 15
    },
    list:{
        backgroundColor: vars.bgColor,
        flexDirection:'row-reverse',
        flex: 1
    },
    txt: {
        fontSize: 18,
        color:vars.grey,
        marginRight:17,
        paddingRight:12,
        paddingVertical:12,
        borderRadius:5,
        borderWidth:0.5,
        borderColor:vars.white,
        width: '80%',
        textAlign: 'right',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 1.22,
        elevation: 3,
        
    },
    img:{
        borderRadius:50,
        width:120,
        height:120
    },
    Icon:{
        color: vars.baseColor,
        paddingVertical:6
        // paddingTop:50,
        // marginRight:5
        },
    edit:{
        color: 'grey',
        paddingTop:38,
        paddingLeft:8,
    },
    set:{
        color: 'white',
    },
    error: {
        borderWidth:3,
        borderColor:'red',
},
    inputStyle: {
        backgroundColor: '#fff',
        width:140,
        height:40,
        textAlign:'center'
},
    cancleBtn:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor:vars.baseColor,
        width:150,
        height:60,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        margin:10
      },
      textbtn:{
        color:vars.white,  
        fontSize: 16,
        fontWeight:'bold'
      },
      ModalInsideView:{
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor : vars.white, 
        height: '60%' ,
        width: '90%',
        borderRadius:10,
        borderColor:vars.baseColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
       
      },
      textTnputModal:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        height:50,
        width: '90%',
        borderRadius:5,
        borderWidth:1,
        borderColor:vars.baseColor,
        textAlign: 'right',
        margin:8,
        paddingRight:9
    

      }
  })

  export default Profile ;