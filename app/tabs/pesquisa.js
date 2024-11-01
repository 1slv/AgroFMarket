import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function Pesquisa() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite a especialidade"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua localização"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Resultado da busca</Text>
      <View style={styles.resultContainer}>
      <Image source={require('../../assets/img_doutora.png')} style={styles.logo} />
        <Text style={styles.resultText}>Dra. Ana Lúcia - Angiologista</Text>
        <TouchableOpacity style={styles.agendarButton}>
          <Text style={styles.agendarText}>Agendar consulta</Text>
        </TouchableOpacity>
      </View>
      {/* Adicione mais resultados conforme necessário */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 50,
    backgroundColor: '#0B3B60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  resultContainer: {
    marginBottom: 15,
  },
  resultText: {
    color: '#333',
    marginBottom: 5,
  },
  agendarButton: {
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  agendarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
