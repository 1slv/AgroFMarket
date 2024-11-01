import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { useUsuariosDatabase,usuariosDatabase } from '../database/useUsuariosDatabase';

export default function informacoes({ navigation }) {

  const handleSignUp = () => {
    //listagem()
    router.push('/enderecopage');
  };

  //const [usuarios, setUsuarios] = useState<usuariosDatabase[]>([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  // const funcUsuariosDatabase = useUsuariosDatabase(inserir)

  // async function listagem() {
  //   try{
  //     const resultado = await funcUsuariosDatabase.inserir(inserir)
  //     return resultado
  //   }catch(error){
  //     console.log(error)
  //   }
  // }


  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Insira alguns dados básicos:</Text>

      <View style={styles.group2}>
            <Text style={styles.add}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome completo"
              onChangeText={text => setNome(text)}
            />
      </View>

      <View style={styles.group2}>
      <Text style={styles.add}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu endereço de email"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />
      </View>

      <View style={styles.group3}>
      <Text style={styles.add}>Crie uma Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira sua senha"
        secureTextEntry={true}
        onChangeText={text => setSenha(text)}
      />
      </View>
      
      <View style={styles.group4}>
      <Text style={styles.add}>Repita a Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Repita sua senha"
        secureTextEntry={true}
        onChangeText={text => setSenha(text)}
      />
      </View>

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
  add: {
    margin: 2,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    color:'#0B3B60',
  },
  group1: {
    textAlign: 'left',
    width: '100%',
  },
  group2: {
    textAlign: 'left',
    width: '100%',
  },
  group3: {
    textAlign: 'left',
    width: '100%',
  },
  group4: {
    textAlign: 'left',
    width: '100%',
  }
});
