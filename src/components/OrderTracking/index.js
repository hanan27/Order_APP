import {StyleSheet,View, Text } from 'react-native';
import React, {Component} from 'react';
import Steps from 'react-native-steps';
import vars from "../../utils/vars";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
 
const labels = ["تم إستلام الطلب","يتم تجهيز الطلب","الطلب جاهز"];
const configs = {
  stepIndicatorSize: 45,
  currentStepIndicatorSize:50,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: vars.baseColor,
  stepStrokeWidth: 5,
  stepStrokeFinishedColor: vars.baseColor,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: vars.baseColor,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: vars.baseColor,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: vars.baseColor,
  stepIndicatorLabelFinishedColor: vars.baseColor,
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  stepIndicatorLabelCurrentColor: vars.baseColor,
  labelColor: '#787b7a',
  labelSize: 15,
  currentStepLabelColor: vars.baseColor,
  labelAlign:'flex-start',
  labelStyle:{marginLeft:10}
};
const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? vars.white : vars.baseColor,
    size: 25
  }
  switch (position) {
    case 0: {
      iconConfig.name = 'assignment'
      break
    }
    case 1: {
      iconConfig.name = 'local-dining'
      break
    }
    case 2: {
      iconConfig.name = 'done'
      break
    }
    default: {
      break
    }
  }
  return iconConfig
}

export default class VerticalStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      current:0
    };
  }

  componentDidMount(){
    const {status} = this.props;
    console.log('state', status)
    this.onPageChange(status)
  }

  render() {
    return (
      <View>
        <Steps
          count={3}
          configs={configs}
          current={this.state.current}
          renderStepIndicator={this.renderStepIndicator}
          labels={labels}
          direction='vertical'
          reversed={false}
        />
      </View>
    )
  }
  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  )
 
  onPageChange(position){
    switch (position) {
      case 1:
        this.setState({current: 0});
        break;
      case 2:
        this.setState({current: 1});
        break;
      case 4:
        this.setState({current: 2});
        break;
    }
  }
}

