import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";

import { tryAuth } from "../../store/actions";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import backgroundImage from "../../assets/background.jpg";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import validate from "../../utility/validation";

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authMode: "Signup",
      orientation:
        Dimensions.get("window").height > 500 ? "portrait" : "landscape",
      controls: {
        email: {
          value: "",
          valid: false,
          validationRules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: "",
          valid: false,
          validationRules: {
            minLength: 6
          },
          touched: false
        },
        confirmPassword: {
          value: "",
          valid: false,
          validationRules: {
            equalTo: "password"
          },
          touched: false
        }
      },
      isFormValid: false
    };
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    if (dims.window.height > 500) {
      this.setState({ orientation: "portrait" });
    } else {
      this.setState({ orientation: "landscape" });
    }
  };
  static navigationOptions = {
    title: "Log in"
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }

    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }

    this.setState(prevState => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
    this.setState(prevState => {
      if (this.state.authMode === "Login") {
        return {
          isFormValid:
            prevState.controls.email.valid &&
            prevState.controls.password.valid &&
            prevState.controls.confirmPassword.valid
        };
      } else {
        return {
          isFormValid:
            prevState.controls.email.valid && prevState.controls.password.valid
        };
      }
    });
  };

  onLoginHandler = () => {
    // const authData = {
    //   email: this.state.controls.email.value,
    //   password: this.state.controls.password.value
    // };
    // this.props.onLogin(authData);
    this.props.navigation.navigate("App");
  };

  authModeSwitchHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "Login" ? "Signup" : "Login"
      };
    });
  };

  render() {
    let headerText = null;
    if (this.state.orientation === "portrait") {
      headerText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImageStyle}
      >
        <View style={styles.container}>
          {headerText}
          <ButtonWithBackground
            color="#29aaf4"
            onPress={this.authModeSwitchHandler}
          >
            Switch To {this.state.authMode === "Login" ? "Login" : "Sign Up"}
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput
              style={
                !this.state.controls.email.valid &&
                this.state.controls.email.touched
                  ? styles.invalid
                  : styles.input
              }
              placeholder="Your E-mail Address"
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState("email", val)}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <View
              style={
                this.state.orientation === "portrait"
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  this.state.orientation === "landscape" &&
                  this.state.authMode === "Login"
                    ? styles.landscapePasswordWrapper
                    : styles.portraitPasswordWrapper
                }
              >
                <DefaultInput
                  style={
                    !this.state.controls.password.valid &&
                    this.state.controls.password.touched
                      ? styles.invalid
                      : styles.input
                  }
                  placeholder="Password"
                  value={this.state.controls.password.value}
                  onChangeText={val => this.updateInputState("password", val)}
                  secureTextEntry
                />
              </View>
              {this.state.authMode === "Login" ? (
                <View
                  style={
                    this.state.orientation === "landscape"
                      ? styles.landscapePasswordWrapper
                      : ""
                  }
                >
                  <DefaultInput
                    style={
                      !this.state.controls.confirmPassword.valid &&
                      this.state.controls.confirmPassword.touched
                        ? styles.invalid
                        : styles.input
                    }
                    placeholder="Confirm Password"
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={val =>
                      this.updateInputState("confirmPassword", val)
                    }
                    secureTextEntry
                  />
                </View>
              ) : null}
            </View>
          </View>
          <ButtonWithBackground
            color="#29aaf4"
            onPress={this.onLoginHandler}
            disabled={false}
          >
            Login
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textHeading: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 10
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  backgroundImageStyle: {
    width: "100%",
    flex: 1
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  },
  invalid: {
    borderWidth: 1,
    backgroundColor: "#f9c0c0",
    borderColor: "red"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(tryAuth(authData))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(AuthScreen);
