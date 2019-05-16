import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
  View,
  StyleSheet
} from "react-native";

const buttonWithBackground = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color, shadowColor: props.color },
        props.disabled !== undefined && props.disabled ? styles.disabled : null
      ]}
    >
      <Text>{props.children}</Text>
    </View>
  );
  if (Platform.OS === "android") {
    if (props.disabled !== undefined && props.disabled) {
      return content;
    } else {
      return (
        <TouchableNativeFeedback onPress={props.onPress}>
          {content}
        </TouchableNativeFeedback>
      );
    }
  }

  if (props.disabled !== undefined && props.disabled) {
    return content;
  } else {
    return (
      <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    shadowOffset: { width: 1, height: 3 },
    elevation: 3,
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  disabled: {
    backgroundColor: "#bbb"
  }
});

export default buttonWithBackground;
