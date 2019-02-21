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

import getImageForWeather from './src/utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './src/utils/api';

import SearchInput from './src/components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      loading: false,
      error: false,
      temperature: 0,
      weather: ''
    }
  }

  handleUpdateLocation = async city => {
    if (city.trim() === "") return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(locationId);

        this.setState({
          location,
          weather,
          temperature,
          loading: false,
          error: false
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true
        })
      }
    });
  };

  componentDidMount() {
    this.handleUpdateLocation('San Francisco');
  }

  render() {
    const { loading, error, location, weather, temperature } = this.state; 
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}>
          <View style={styles.detailsContainer}>
            <ActivityIndicator
              animating={loading}
              color="white"
              size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different
                    city.
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text
                      style={[styles.largeText, styles.textStyle]}
                    >
                      {location}
                    </Text>
                    <Text
                      style={[styles.smallText, styles.textStyle]}
                    >
                      {weather}
                    </Text>
                    <Text
                      style={[styles.largeText, styles.textStyle]}
                    >
                      {`${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
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
