import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

class MapPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedLocation: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *
          0.0122
      },
      locationChosen: false
    };
  }

  pickLocationHandler = event => {
    const cords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: cords.latitude,
      longitude: cords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: cords.latitude,
          longitude: cords.longitude
        },
        locationChosen: true
      };
    });
    this.props.onLocationPick({
      latitude: cords.latitude,
      longitude: cords.longitude
    });
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
      },
      err => {
        console.log(err);
        alert("Fetching the postion failed!!!");
      }
    );
  };

  render() {
    let marker = null;
    if (this.state.locationChosen) {
      marker = <Marker coordinate={this.state.focusedLocation} />;
    }
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => (this.map = ref)}
          showsCompass={true}
          showTraffic={true}
          zoomEnabled={true}
          loadingEnabled={true}
          zoomControlEnabled={true}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate me" onPress={this.getLocationHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "90%",
    height: 250
  },
  button: {
    margin: 8
  }
});

export default MapPicker;
