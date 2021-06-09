import React, { Component } from 'react';
import { Text, TouchableHighlight, View, Alert, StyleSheet, Button } from 'react-native';
import Modal from 'react-native-modal';
import CustomStarExample from '../OrderRating/CustomStarExample';

class RatingModal extends Component {
  state = {
    modalVisible: true,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          modalCardPosition='center'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}>

          <View style={styles.mod} >
            <Text style={{fontSize: 25,margin:5}}> How was your last order?</Text>
            <CustomStarExample style={styles.rate}> </CustomStarExample>

<View style={styles.buttonView}>
            <View style={styles.buttons}>
              <Button title='Cancel'
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }} />
                </View>
                <View style={styles.buttons}>
              <Button  title=' Done '
                onPress={() => Alert.alert(
                  'COOL!',
                  'Thanks! see you later.',
                  [
                    { text: 'OK', onPress: () => {
                      this.setModalVisible(!this.state.modalVisible);
                    }},
                  ],
                  { cancelable: false }
                )} />
            </View>
          </View>
          </View>


        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Rate our service,Please :)</Text>
        </TouchableHighlight>
      </View>
    );


  }
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 22,
    flexDirection:'row-reverse',
  },
  mod: {
    opacity:55,
    margin:15,
    padding: 15,
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.07)',
    borderRadius:25,
  },
  rate: {
    justifyContent:'center',
    margin: 10,
    padding: 8,

  },
  buttonView:{
    flexDirection:'row',
    justifyContent:'space-between',
  },

  buttons:{
    backgroundColor:'lightgrey',
    borderRadius:10,
    padding:5,
    margin:15,
    width:100,
  },
 
});

export default RatingModal;
