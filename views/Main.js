import React, { Component } from "react";
import { StyleSheet, Text, TextInput, Button, Alert, View } from "react-native";
import Container from "../components/Container";
import Br from "../components/Br";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      capital: "520",
      interest: "14",
      fees: "10",
      mensualFees: "",
      total: "",
      showAnswer: false
    };
  }

  calculate = () => {
    try {
      let { capital, interest, fees } = this.state;
      if (!capital) throw { message: "Ingrese el capital" };
      if (!interest) throw { message: "Ingrese el interés" };
      if (!fees) throw { message: "Ingrese el número de cuotas" };
      capital = parseFloat(capital);
      interest = parseFloat(interest) / 100;
      fees = parseFloat(fees);
      const mensualFees = (capital * interest) / (1 - Math.pow(1 + interest, -fees));
      const total = mensualFees * fees;
      this.setState({ mensualFees: mensualFees.toFixed(2), total, showAnswer: true });
    } catch (error) {
      Alert.alert("Error", error.message);
      this.setState({ showAnswer: false });
    }
  };

  render() {
    const { capital, interest, fees, mensualFees, total, showAnswer } = this.state;
    return (
      <Container>
        <Text style={styles.title}>Credihelp</Text>
        <Br />
        <Text style={styles.label}>Capital (COP):</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={capital}
          onChangeText={capital => this.setState({ capital })}
          style={styles.input}
          placeholder="Capital"
        />
        <Text style={styles.label}>Interés (%):</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={interest}
          onChangeText={interest => this.setState({ interest })}
          style={styles.input}
          placeholder="Interés"
        />
        <Text style={styles.label}>Número de cuotas:</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={fees}
          onChangeText={fees => this.setState({ fees })}
          style={styles.input}
          placeholder="Número de cuotas"
        />
        <Br />
        <Button title="Calcular" color="#10ac84" onPress={this.calculate} />
        <Br />
        <Br />
        {showAnswer && (
          <View>
            <Text style={styles.label}>Cuota mensual (COP):</Text>
            <Text style={styles.input}>{mensualFees}</Text>
            <Text style={styles.label}>Total a pagar (COP):</Text>
            <Text style={styles.input}>{total}</Text>
          </View>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 50,
    borderWidth: 1,
    color: "#222f3e",
    height: 40,
    paddingHorizontal: 15,
    textAlignVertical: "center",
    width: "100%"
  },
  label: {
    color: "white",
    fontSize: 20
  },
  title: {
    color: "white",
    fontSize: 30,
    textAlign: "center"
  },
  searchButton: {
    backgroundColor: "#14CA9B",
    borderRadius: 30,
    borderColor: "white",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: "40%"
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20
  }
});
