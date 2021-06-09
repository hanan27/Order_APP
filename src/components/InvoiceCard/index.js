import React, { Component } from 'react';
import { Text, View } from 'react-native';

class InvoiceCard extends Component {
  
  render() {
    const item = this.props;
    return (
      <View style={{flexDirection: 'row', direction: 'rtl', marginVertical:10, justifyContent:'space-between',}}>
        <Text style={{}}> {item.quantity} </Text>
        <Text style={styles.textStyle}> {item.name.ar}</Text>
        <Text style={{}}>{item.final_price} ريال</Text>
      </View>
    );
  }
}

const styles = {
  row: {
    borderBottomWidth: 2,
    borderColor: '#e2e2e2',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1
  },
  textStyle: {
    paddingRight: 7,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  sub: {
    paddingRight: 9,
    fontSize: 12,
    textAlign: 'right'
  },
  Pr: {
    justifyContent: 'space-around',
    marginLeft: 20
  },
};

export default InvoiceCard;