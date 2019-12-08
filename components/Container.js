import React, { Component } from "react";
import { StatusBar, ScrollView, KeyboardAvoidingView, AsyncStorage } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <LinearGradient
        colors={["#2cb79a", "#75e4c4"]}
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>{this.props.children}</ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}
