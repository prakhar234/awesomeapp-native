import React from "react";
import { FlatList, StyleSheet } from "react-native";

import ListItem from "../ListItem/ListItem";

const placeList = props => (
  <FlatList
    style={styles.listContainer}
    data={props.places}
    keyExtractor={info => info.id.toString()}
    renderItem={info => (
      <ListItem
        placeName={info.item.name}
        placeImage={info.item.image}
        onItemPressed={() => props.onItemPressed(info.item.id)}
      />
    )}
  />
);

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default placeList;
