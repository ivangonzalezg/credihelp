import React, { Component } from "react";
import { StyleSheet, Text, TextInput, Button, Alert, View } from "react-native";
import Container from "../components/Container";
import Br from "../components/Br";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      capital: "",
      interest: "",
      fees: "",
      mensualFees: "",
      total: "",
      showAnswer: false
    };
  }

  parseFloat(n = 0, p = "") {
    return new Promise((resolve, reject) => {
      if (!/^\d+(\.?){1}(\d*)?$/.test(n)) reject({ message: `Formato de números incorrecto (${p.toUpperCase()})` });
      const r = parseFloat(n);
      if (r.toString() === "NaN") {
        reject({ message: `Formato de números incorrecto (${p.toUpperCase()})` });
      }
      resolve(r);
    });
  }

  calculate = async () => {
    try {
      let { capital, interest, fees } = this.state;
      if (!capital) throw { message: "Ingrese el cuánto cuesta tu producto" };
      if (!interest) throw { message: "Ingrese cuáles son los intereses" };
      if (!fees) throw { message: "Ingrese en cuántas cuotas deseas pagarlo" };
      capital = await this.parseFloat(capital, "Cuanto cuesta tu producto");
      interest = (await this.parseFloat(interest, "Cuáles son los intereses")) / 100;
      fees = await this.parseFloat(fees, "En cuántas cuotas deseas pagarlo");
      if (interest > 100) throw { message: "Interés mayor al 100%" };
      let mensualFees = (capital * interest) / (1 - Math.pow(1 + interest, -fees));
      let total = mensualFees * fees;
      mensualFees = mensualFees.toFixed(2);
      total = total.toFixed(2);
      this.setState({ mensualFees, total, showAnswer: true });
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
        <Text style={styles.label}>¿Cuánto cuesta tu producto? (COP):</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={capital}
          onChangeText={capital => this.setState({ capital })}
          style={styles.input}
          placeholder="¿Cuanto cuesta tu producto?"
        />
        <Text style={styles.label}>¿Cuáles son los intereses? (%):</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={interest}
          onChangeText={interest => this.setState({ interest })}
          style={styles.input}
          placeholder="¿Cuáles son los intereses?"
        />
        <Text style={styles.label}>¿En cuántas cuotas deseas pagarlo?:</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={fees}
          onChangeText={fees => this.setState({ fees })}
          style={styles.input}
          placeholder="¿En cuántas cuotas deseas pagarlo?"
        />
        <Br />
        <Button title="Calcular" color="#10ac84" onPress={this.calculate} />
        <Br />
        <Br />
        {showAnswer && (
          <View>
            <Text style={styles.label}>El valor de tu cuota será (COP):</Text>
            <Text style={styles.input}>{mensualFees}</Text>
            <Text style={styles.label}>Al final de tu crédito habrás pagado (COP):</Text>
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
