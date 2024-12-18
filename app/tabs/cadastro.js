import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import database from '../database/database';

export default function Cadastro() {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastro = async () => {
    if (!selectedValue || !nome || !email || !senha || !telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const tipo = selectedValue === 'op1' ? 'agricultor' : 'consumidor';
      const novoUsuario = await database.cadastrarUsuario(
        tipo,
        nome,
        email,
        senha,
        telefone
      );
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.replace('/'),
        }
      ]);
      console.log('Usuário cadastrado com sucesso:', novoUsuario);
    } catch (error) {
      Alert.alert('Erro', error.message);
      console.error('Erro ao realizar cadastro:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/backgound.png')} style={styles.fundoImg}/>
      <View style={styles.backOp}/>

      <View style={styles.backLog}>
        <Image source={require('../../assets/logo.png')} style={styles.logo}/>

        <View style={styles.formContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker}
            >
              <Picker.Item 
                label="Selecione uma opção" 
                value="" 
                style={styles.pickerItem}
              />
              <Picker.Item 
                label="Agricultor" 
                value="op1" 
                style={styles.pickerItem}
              />
              <Picker.Item 
                label="Consumidor" 
                value="op2" 
                style={styles.pickerItem}
              />
            </Picker>
          </View>

          <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
            secureTextEntry
          />

          <TextInput
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.buttonContainer} onPress={handleCadastro}>
            <Image source={require('../../assets/buttonImg.png')} style={styles.buttonImag} />
          </TouchableOpacity>

          <View style={styles.loginLinkContainer}>
            <Text>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => router.replace('/')}>
              <Text style={styles.loginText}>Faça Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fundoImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  backOp: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#80BD1C',
    opacity: 0.43
  },
  backLog: {
    width: 352,
    height: 713,
    backgroundColor: '#E6E6E6',
    borderRadius: 50,
    alignItems: 'center',
  },
  logo: {
    width: 266,
    height: 177,
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
  },
  pickerItem: {
    fontSize: 14,
    opacity: 0.5,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonImag: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  loginLinkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#333',
    fontSize: 16,
    textDecorationLine: 'underline',
  }
}); 