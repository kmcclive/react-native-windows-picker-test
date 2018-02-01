/**
 * @flow
 */

import React, { Component } from 'react';
import { View, Button, Picker, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: 100,
    marginVertical: 10,
  },
  label: {
    width: 50,
    marginLeft: 10,
  }
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Picker style={styles.picker} selectedValue="D" >
          <Picker.Item key="A" value="A" label="A" />
          <Picker.Item key="B" value="B" label="B" />
          <Picker.Item key="C" value="C" label="C" />
        </Picker>
      </View>
    )
  }
};