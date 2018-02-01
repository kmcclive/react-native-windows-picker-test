/**
 * @flow
 */

import React, { Component } from 'react';
import { View, Picker, Text, NativeModules, NativeEventEmitter, StyleSheet } from 'react-native';

const presenter = NativeModules.Presenter;
const emitter = new NativeEventEmitter(presenter);

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
  constructor() {
    super();

    this.state = {
      groupOptions: [],
      value1Options: [],
      value2Options: [],
      group: '',
      value1: '',
      value2: '',
    }
  }

  componentWillMount() {
    emitter.addListener("optionsChanged", this.handleOptionsChanged);
    emitter.addListener("selectionsChanged", this.handleSelectionsChanged);

    presenter.sendReadyEvent();
  }

  componentWillUnmount() {
    emitter.removeListener("optionsChanged", this.handleOptionsChanged);
    emitter.removeListener("selectionsChanged", this.handleSelectionsChanged);
  }

  handleOptionsChanged = (body) => {
    this.setState({
      ...this.state,
      groupOptions: body.groupOptions,
      value1Options: body.value1Options,
      value2Options: body.value2Options,
    })
  }

  handleSelectionsChanged = (body) => {
    this.setState({
      ...this.state,
      group: body.group,
      value1: body.value1,
      value2: body.value2,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.group} 
            onValueChange={value => {
              this.setState({...this.state, group: value});
              presenter.sendGroupChangedEvent(value);
            }}>
            {this.state.groupOptions.map(item => (<Picker.Item key={item} value={item} label={item} />))}
          </Picker>
          <Text style={styles.label}>{this.state.group}</Text>
        </View>
        <View style={styles.row}>
          <Picker 
            style={styles.picker}
            selectedValue={this.state.value1} 
            onValueChange={value => this.setState({...this.state, value1: value})}>
            {this.state.value1Options.map(item => (<Picker.Item key={item} value={item} label={item} />))}
          </Picker>
          <Text style={styles.label}>{this.state.value1}</Text>
        </View>
        <View style={styles.row}>
          <Picker 
            style={styles.picker}
            selectedValue={this.state.value2} 
            onValueChange={value => this.setState({...this.state, value2: value})}>
            {this.state.value2Options.map(item => (<Picker.Item key={item} value={item} label={item} />))}
          </Picker>
          <Text style={styles.label}>{this.state.value2}</Text>
        </View>
      </View>
    )
  }
};