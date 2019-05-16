import React from "react";
import { StyleSheet, View } from "react-native";

import DefaultInput from "../UI/DefaultInput/DefaultInput";

const placeInput = props => (
  <View style={styles.buttonContainer}>
    <DefaultInput
      placeholder="Place Name"
      value={props.placeData.value}
      valid={props.placeData.valid}
      touched={props.placeData.touched}
      onChangeText={props.onChangeText}
    />
  </View>
);
const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%"
  }
});
export default placeInput;
