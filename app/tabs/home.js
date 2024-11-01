import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';


export default function Home() {
    const handleSignUp = () => {
        router.push('/tabs/consultas');
      };
    
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Boas-vindas!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a especialidade"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua localização"
      />
      <TouchableOpacity style={styles.button}  onPress={handleSignUp}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Depoimentos</Text>
      <Text style={styles.depoimento}>
        "Atendimento ideal"
      </Text>
      <Text style={styles.autor}>- Marcos, 20 anos, São Paulo/SP</Text>

      <Text style={styles.depoimento}>
        "Excelente atendimento"
      </Text>
      <Text style={styles.autor}>- Maria Eduarda, 18 anos, Rio de Janeiro/RJ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
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
  depoimento: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  autor: {
    color: '#333',
    marginBottom: 20,
  },
  logo: {
    alignItems: 'center',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
