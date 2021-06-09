import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,} from 'react-native';
import { Icon } from 'native-base';
import vars from "../../utils/vars";
import { BlurView } from 'expo-blur';
import * as firebase from 'firebase';
import AuthStore from '../../config/store/auth';

export default class DrawerNav extends Component{
    render(){
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <BlurView tint="dark" intensity={50} style={styles.notBlurred}>     

                    {AuthStore.isLogin ?
                        <Fragment>
                            <TouchableOpacity style={styles.to} onPress={() => navigation.navigate('Profile')}>
                                <Icon name="person" style={styles.Icon}/>
                                <Text style={styles.Items}>الملف الشخصي</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.to} onPress={() => navigation.navigate('OrderStatus') } >
                                <Icon name="paper" style={styles.Icon}/>
                                <Text style={styles.Items}>الطلبات </Text>
                            </TouchableOpacity>
                        </Fragment>
                    :
                        <Fragment>
                            <TouchableOpacity style={styles.to} onPress={() => navigation.navigate('SignUp')} >
                                <Icon name="md-person-add" style={styles.Icon}/>
                                <Text style={styles.Items}>إنشاء حساب </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.to} onPress={() => navigation.navigate('Login') }>
                                <Icon name="star" style={styles.Icon}/>
                                <Text style={styles.Items}>تسجيل دخول </Text>
                            </TouchableOpacity>
                        </Fragment>
                    }

                    <TouchableOpacity style={styles.to}>
                        <Icon name="chatbubbles" style={styles.Icon}/>
                        <Text style={styles.Items}>تواصل معنا </Text>
                    </TouchableOpacity>

                    {AuthStore.isLogin ?
                        <TouchableOpacity style={styles.to} onPress={() => {firebase.auth().signOut(); setTimeout(() => AuthStore.setUser({}), 1000); navigation.navigate('Main'); navigation.closeDrawer()}} >
                            <Icon name="md-exit" style={styles.Icon}/>
                            <Text style={styles.Items} >خروج </Text>
                        </TouchableOpacity>
                        : null
                    }
                </BlurView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    Items:{
        alignItems: 'flex-start',
        padding: '4.2%' ,
        direction: "rtl",
        color: 'white'
    },
    Icon:{
        color: vars.baseColor,
        padding: 2.5,
    },
    to: {
        marginLeft:30,
        marginBottom: 10,
        padding: 4,
        flexDirection:'row-reverse',
        alignItems:'flex-end'
    },
    notBlurred: {
        ...StyleSheet.absoluteFill,
        paddingTop: 60
    }
})