import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
  <TextInput {...props} style={[styles.input, props.style]} />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 10
  }
});

export default defaultInput;
