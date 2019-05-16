import React, { Component } from "React";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerItems, SafeAreaView } from "react-navigation";

class DrawerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          <View style={styles.containerHeader}>
            <Text>Menu</Text>
          </View>
          <DrawerItems
            {...this.props}
            onItemPress={({ route, focused }) => {
              if (route.key === "App") {
                navigation.navigate(route.routes[0].routes[0].routeName);
              } else {
                this.props.onItemPress({ route, focused });
              }
            }}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
    fontSize: 15,
    fontWeight: "bold"
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20
  }
});

export default DrawerContainer;
