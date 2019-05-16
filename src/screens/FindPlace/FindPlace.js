import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import { getPlaces } from "../../store/actions/index";

class FindPlaceScreen extends Component {
  static navigationOptions = {
    title: "Find Place"
  };

  constructor(props) {
    super(props);
    this.state = {
      placesLoaded: false,
      removeAnim: new Animated.Value(1),
      placesAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.props.getPlaces();
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start(() => {
      this.setState({ placesLoaded: true });
      this.placesLoadedHandler();
    });
  };

  onItemPressed = key => {
    const selectedPlace = this.props.places.find(place => {
      return place.id === key;
    });

    this.props.navigation.navigate("PlaceDetail", {
      selectedPlace: selectedPlace
    });
  };
  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    if (this.state.placesLoaded) {
      content = (
        <Animated.View style={{ opacity: this.state.placesAnim }}>
          <PlaceList
            places={this.props.places}
            onItemPressed={this.onItemPressed}
          />
        </Animated.View>
      );
    }

    return (
      <View style={this.state.placesLoaded ? "" : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    borderColor: "orange",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20
  },
  searchButtonText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPlaces: () => dispatch(getPlaces())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPlaceScreen);
