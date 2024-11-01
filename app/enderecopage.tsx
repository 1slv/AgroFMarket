import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useUsuariosDatabase,UsuariosDatabase } from '../database/useUsuariosDatabase';

export default function enderecopage({ navigation }) {

  const [cep, setCep] = useState(0)
  const [endereco, setEndereco] = useState('')
  const [numero, setNumero] = useState(0)
  const [complemento, setComplemento] = useState('')
  const [telefone, setTelefone] = useState(0)
  
  
  const handleSignUp = () => {
    router.push('/planosaudepage');
    //inserir()
  };

  const voltar = () => {
    router.push('/');
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Agora, mais alguns dados sobre você:</Text>

      <Text style={styles.add}>CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu CEP"
        keyboardType="numeric"
      />

      <Text style={styles.add}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu endereço"

      />
      <Text style={styles.add}>Número</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu número"
        keyboardType="numeric"
      />
      <Text style={styles.add}>Complemento</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu complemento"
        onChangeText={text => setComplemento(text)}
      />
      <Text style={styles.add}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
      />

    
      <TouchableOpacity
        style={[styles.button, styles.buttonSecondary]}
        onPress={voltar}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0B3B60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
  },
  add: {
    margin: 2,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
    color:'#0B3B60',
    display: 'flex',
  },
});

