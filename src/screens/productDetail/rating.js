import React, { Component } from 'react';
import { StyleSheet, View, Platform, Alert, Text, Image, TouchableOpacity } from 'react-native';
import secondaryApi from '../../config/secondaryApi';
import vars from '../../utils/vars';
import AuthStore from '../../config/store/auth';
 
 class Rating extends Component{
    constructor(){
        super();
        this.state = { 
            starCount: 0,
            userCount: 0,
            loading: true
         }
        this.Star = 'https://2.top4top.net/p_1271jejqg2.png';
        this.Star_With_Border = 'https://1.top4top.net/p_1271uj62i1.png';
    }

    componentDidMount(){
        const id = this.props.productId;
        secondaryApi.get('/rating/getByProduct/'+ id).then(res => {
          let starAvg = 0;
          if (res.length > 0) {
              const stars = res.reduce((a, b) => a + b.star, 0);
              starAvg = (stars / res.length);
          }
          this.setState({starCount: starAvg, userCount: res.length, loading: false});
        }).catch(function(err) {
            console.log('error: ', err);
        });
      }

    create() {
        const {starCount} = this.state;
        const data = {productId: this.props.productId, userId: AuthStore.user.uid, comment: 'test', star: starCount}
        secondaryApi.post('/rating/', data)
        .then(res => {
            console.log(res)    
        }).catch(function (err) {
            console.log('error: ', err);
        });
    }
 
 
    UpdateRating( key ){
        this.setState({ starCount: key });
        
        Alert.alert(
            `هل ترغب بإضافة التقييم؟`, undefined,
            [
                {text: 'لا'},
                {text: 'نعم', onPress: () => this.create()},
            ]
        );
    }
 
 
    render(){
        let React_Native_Rating_Bar = [];
        for( var i = 1; i <= 5; i++ )
        {
          React_Native_Rating_Bar.push(
                <TouchableOpacity 
                  activeOpacity = { 0.7 } 
                  key = { i } 
                  onPress = { this.UpdateRating.bind( this, i ) }>
                    <Image 
                      style = { styles.StarImage } 
                      source = { ( i <= this.state.starCount ) ? { uri: this.Star } : { uri: this.Star_With_Border } } 
                    />
                </TouchableOpacity>
          );
        }
        
        if (!this.state.loading) {
        return(
            <View style = { styles.MainContainer }>
                <View style = { styles.childView }>
                <Text style={{color: "#787b7a", fontSize: 12, paddingRight: 6}}>({this.state.userCount})</Text>
                  {React_Native_Rating_Bar}
                </View>
            </View>
        );}
        else
        return (<View style = {[styles.MainContainer, {height: 20}]}/>)
    }
}

export default Rating;
 
const styles = StyleSheet.create(
{
    MainContainer:
    {
        // justifyContent: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 5 : 0
    },
    childView:
    {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    StarImage:
    {
        width: 15,
        height: 15,
        resizeMode: 'cover',
        tintColor: vars.baseColor
    },
});