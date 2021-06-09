import React, { Component,Modal  } from "react";
import { StyleSheet, Text, View ,Button} from 'react-native';
import StarRating from 'react-native-star-rating';

class CustomStarExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 4,
    };
  }
 
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
 
  render() 
  {
    return (
      
      <StarRating
      starSize={30}
        disabled={false}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        fullStarColor={'gold'}
        halfStarColor={'gold'}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        
      />
    
    );


    

  }
}
 
export default CustomStarExample;