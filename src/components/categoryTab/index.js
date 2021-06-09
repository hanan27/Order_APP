import React, {Component} from 'react';
import { Text, Image, TouchableWithoutFeedback, StyleSheet, FlatList, View} from 'react-native';
import sharedStyles from '../../utils/sharedStyles';
import vars from '../../utils/vars';
import { LinearGradient } from 'expo-linear-gradient';

class CategoryTab extends Component { 
  render() {
    const {data, activeTab, onChange,} = this.props;
    return (
      <FlatList 
          data={data} 
          renderItem={({item}) =>
            <TouchableWithoutFeedback 
              onPress={() => {onChange(item.hid)}}
            >
              <LinearGradient  
                style={[styles.container, sharedStyles.shadow]} 
                colors={ [vars.baseColor, 'rgba(237, 67, 103, 1)']}
              >
                <View style={[styles.gradient, {
                  tintColor: activeTab === item.hid ? 'white' : vars.baseColor,
                  backgroundColor: activeTab === item.hid ? 'transparent' : 'white',
                  }]} >
                <Image 
                  style={[styles.img, {tintColor: activeTab === item.hid ? 'white' : vars.baseColor}]} 
                  source={{uri: item.image_path}} 
                /> 
                <Text style={[styles.txt, {color: activeTab === item.hid ? 'white' : vars.baseColor}]}>
                  {item.name.ar}
                </Text>
                </View>
              </LinearGradient>
            </TouchableWithoutFeedback>
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          inverted= {-1}
          keyExtractor= {(item) => item.hid}
          extraData= {(item) => item.hid}
      />
    );
  }
} 

const styles = StyleSheet.create({  
  container: {
    height: 65,
    width: 65,
    borderRadius: 10,
    margin: 10,
    marginLeft: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 62,
    width: 62,
    borderRadius: 9,
  },
  img: {
    width: 25, 
    height: 25, 
    marginTop: 10,
  },
  txt: {
    fontSize: 9, 
    fontWeight: 'bold', 
    padding: 10, 
    marginBottom: 20,
  }
})

export default CategoryTab;