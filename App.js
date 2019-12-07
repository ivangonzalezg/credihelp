import { AppLoading } from "expo";
import React, { Component } from "react";
import Main from "./views/Main";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false
    };
  }

  async loadResourcesAsync() {}

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  handleLoadingError(error) {
    console.warn(error);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading startAsync={this.loadResourcesAsync} onError={this.handleLoadingError} onFinish={() => this.handleFinishLoading()} />
      );
    } else {
      return <Main />;
    }
  }
}
