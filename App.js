import * as React from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Progress from 'react-native-progress';

export default class App extends React.Component {
  state = {
    batteryLevel: null,
  };

  componentDidMount() {  
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async _subscribe() {
    const batteryLevel = Math.round(await Battery.getBatteryLevelAsync() * 100)

    if(await Battery.isAvailableAsync()){
      this.setState({ batteryLevel });
    } else {
      this.setState({batteryLevel: Math.round(Math.random() * 100)})
    }
      this._subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {

      this.setState({batteryLevel})
      console.log('batteryLevel changed!', batteryLevel);
    });
  }

  _unsubscribe() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  async refresh() {
    const batteryLevel = Math.round(await Battery.getBatteryLevelAsync() * 100);

    if(await Battery.isAvailableAsync()){
      this.setState({ batteryLevel });
    } else {
      this.setState({batteryLevel: Math.round(Math.random() * 100)})
    }

    console.log("Battery percentage has been refreshed!")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Current Battery Level:</Text>
        <Text style={styles.text}>{this.state.batteryLevel}</Text>
        <Button title="Refresh battery percentage" onPress={() => this._subscribe()} color="green"/>
        <Progress.Bar style={styles.progressors} progress={this.state.batteryLevel/100} width={300} animationConfig={{bounciness: 25}} color="white" unfilledColor="green"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontWeight: "bold",
    color: "#FFFFFF",
    margin: 3
  },
  progressors: {
    margin: 20,
    color: "green"
  }
});