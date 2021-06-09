import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import vars from "../../utils/vars";

class Loading extends Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={vars.baseColor} size={'large'} />
            </View>
        )
    }
}

export default Loading;