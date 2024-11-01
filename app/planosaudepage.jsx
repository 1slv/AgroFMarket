import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import CheckBox from 'expo-checkbox';
//import { useUsuariosDatabase,usuariosDatabase } from '../database/useUsuariosDatabase';

export default function planosaudepage({ navigation }) {

  // const [unimed, setUnimed] = useState(false)
  // const [bradesco, setBradesco] = useState(false)
  // const [outro, setOutro] = useState(false)

  async function criarUsuario(){
    try{
      const resultado = await funcUsuariosDatabase.inserir(nome,email, senha, cep, endereco, numero, complemento, telefone, unimed, bradesco, outro)
      if(resultado){
        Alert.alert('Usuario criado com sucesso!')
      }
      listagem()
    }catch(error)
    {
      console.log(error)
    }
  }

  const [selectedPlan, setSelectedPlan] = useState('');

  const handleSignUp = () => {
    router.push('/tabs/home');
  };

  const voltar = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Para finalizar, qual seu plano de saúde?</Text>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Sulamerica'}
          onValueChange={() => setSelectedPlan('Sulamerica')}
        />
        <Text style={styles.label}>Sulamerica</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Unimed'}
          onValueChange={() => setSelectedPlan('Unimed')}
          
        />
        <Text style={styles.label}>Unimed</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Bradesco'}
          onValueChange={() => setSelectedPlan('Bradesco')}
        />
        <Text style={styles.label}>Bradesco</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Amil'}
          onValueChange={() => setSelectedPlan('Amil')}
        />
        <Text style={styles.label}>Amil</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Biosaúde'}
          onValueChange={() => setSelectedPlan('Biosaúde')}
        />
        <Text style={styles.label}>Biosaúde</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Biovida'}
          onValueChange={() => setSelectedPlan('Biovida')}
        />
        <Text style={styles.label}>Biovida</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Outros'}
          onValueChange={() => setSelectedPlan('Outros')}
        />
        <Text style={styles.label}>Outros</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Nenhum'}
          onValueChange={() => setSelectedPlan('Nenhum')}
        />
        <Text style={styles.label}>Não tenho plano</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.buttonSecondary]}
        onPress={voltar}
      >
        <Text style={styles.buttonText} >Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button1}
        onPress={() => alert('Cadastro concluído!')}
      >
        <Text style={styles.buttonText}>Cadastrar!</Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    padding: 10,
    alignItems: 'left',
    borderRadius: 10,
    margin: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#90989F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  button1: {
    width: '100%',
    height: 50,
    backgroundColor: '#0B3B60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
})
