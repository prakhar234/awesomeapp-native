import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const listItem = props => {
  return (
    <TouchableOpacity onPress={props.onItemPressed}>
      <View style={styles.listItem}>
        <Image
          resizeMode="contain"
          style={styles.placeImage}
          source={props.placeImage}
        />
        <Text>{props.placeName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    backgroundColor: "#eee",
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  placeImage: {
    marginRight: 8,
    width: 30,
    height: 30
  }
});

export default listItem;
