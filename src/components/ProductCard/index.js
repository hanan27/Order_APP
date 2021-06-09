import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import StarRate from './StarRate';
import vars from '../../utils/vars';


export default class ProductCard extends Component {
    render() {
        const item = this.props;
        return (
            <View>
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('ProductDetail', {id: item.hid})}>
                <View style={styles.card}>
                    <Image style={styles.pic} source={{ uri: item.image_path }}/>
                    <View style={styles.txt}>
                        <Text style={{textAlign:'right'}} numberOfLines={1}>{item.name.ar}</Text>
                        <Text style={{fontSize: 12, textAlign: 'right'}} numberOfLines={1}>{item.description.ar}</Text>
                    </View>
                    <View style={styles.pricerate}>
                        <StarRate id={item.hid}/>
                        <Text style={styles.price}>{item.sizes[0].price}.00</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center', 
   },
  
   card: {
        flexDirection:'column',
        backgroundColor: "white",
        marginHorizontal:10,
        marginBottom: 15,
        borderRadius: 5,
        padding: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        width:160,
        height: 200,
        justifyContent:'flex-end',
        alignItems: 'stretch'
    },
    txt: { 
        fontWeight: 'bold',
        fontSize: 18,
        alignItems:'flex-end'
    },
    pic: {
        flex: 1,
        marginBottom: 8,
        borderRadius: 5,
        resizeMode: 'cover',
        alignItems: 'center',
    },
    price: {
        color:vars.baseColor,
        fontWeight: "bold",
        fontSize: 12,

    },
    pricerate:{
    justifyContent:'space-between',
    height:30,
     flexDirection:'row',
     paddingTop: 6,
   
    },
})