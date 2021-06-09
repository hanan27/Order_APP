import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StarRating from 'react-native-star-rating';
import secondaryApi from '../../config/secondaryApi';

class StarRate extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      loading: true,
      userCount: 0
    };
  }

  componentDidMount(){
    const id = this.props.id;
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
 
  render() {
    if (!this.state.loading) {
    return (
      <View style={{flexDirection: 'row'}}>
          <StarRating
            starSize={15}
            disabled={true}
            maxStars={5}
            fullStarColor={"#e8b43a"}
            emptyStarColor={"#e8b43a"}
            rating={this.state.starCount}
          />
          <Text style={{color: "#787b7a", fontSize: 12, paddingLeft: 3}}>({this.state.userCount})</Text>
      </View>
    );}
    else
    return (<View/>)
  }
}
 
export default StarRate;