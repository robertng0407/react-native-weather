import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import getImageForWeather from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';

import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  handleUpdateLocation = (location) => {
    this.setState({location});
  };

  componentDidMount() {
    this.handleUpdateLocation('San Francisco');
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground
          source={getImageForWeather('Clear')}
          style={styles.imageContainer}
          imageStyle={styles.image}>
          <View style={styles.detailsContainer}>
            <Text style={[styles.largeText, styles.textStyle]}>
              {this.state.location}
            </Text>

            <Text style={[styles.smallText, styles.textStyle]}>
              Light Cloud
            </Text>

            <Text style={[styles.largeText, styles.textStyle]}>24°</Text>

            <SearchInput 
              placeholder="Search any city" 
              onSubmit={this.handleUpdateLocation} />
          </View>

        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E'
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white'
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },
  imageContainer: {
    flex: 1
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null
  }
});
