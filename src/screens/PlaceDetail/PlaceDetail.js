import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { removePlace } from "../../store/actions/index";
import Icon from "react-native-vector-icons/Ionicons";

class PlaceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deletePlaceHandler = key => {
    this.props.onDeletePlace(key);
    this.props.navigation.navigate("FindPlace");
  };
  render() {
    const { selectedPlace } = this.props.navigation.state.params;
    const focusedLocation = {
      latitude: selectedPlace.location.latitude,
      longitude: selectedPlace.location.longitude,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    };
    return (
      <View style={styles.modalContainer}>
        <Image
          resizeMode="cover"
          style={styles.imageContainer}
          source={selectedPlace.image}
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={focusedLocation}
        >
          <Marker coordinate={focusedLocation} />
        </MapView>
        <Text style={styles.placeName}>{selectedPlace.name}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.deletePlaceHandler(selectedPlace.id)}
          >
            {Platform.OS === "android" ? (
              <Icon size={30} name="md-trash" color="red" />
            ) : (
              <Icon size={30} name="ios-trash" color="red" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 150,
    width: "100%",
    marginBottom: 10
  },
  modalContainer: {
    margin: 22
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  map: {
    width: "100%",
    height: 250
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(removePlace(key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail);
