import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import { useState } from 'react';

export default function Cadastro() {
  const [selectedValue, setSelectedValue] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

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
              itemStyle={styles.pickerItem}
            >
              <Picker.Item 
                label="Selecione uma opção" 
                value="" 
                color="rgba(0, 0, 0, 0.5)"
              />
              <Picker.Item 
                label="Agricultor" 
                value="op1" 
                color="rgba(0, 0, 0, 0.5)"
              />
              <Picker.Item 
                label="Consumidor" 
                value="op2"
                color="rgba(0, 0, 0, 0.5)"
              />
            </Picker>
          </View>

          <TextInput 
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput 
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <TextInput 
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Image 
            source={require('../../assets/buttonImg.png')} 
            style={styles.buttonImag}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.loginLinkContainer}>
        <Link href="/tabs/login" asChild>
          <TouchableOpacity>
            <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </Link>
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
    position: 'absolute'
  },
  backOp: {
    width: 430,
    height: 932,
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
    position: 'relative'
  },
  logo: {
    width: 266,
    height: 177,
    marginTop: 10,
    position: 'absolute',
    zIndex: 0
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    overflow: 'hidden'
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
    position: 'absolute',
    bottom: 220,
    alignItems: 'center',
  },
  buttonImag: {
    height: 70,
    width: 70,
  },
  loginLinkContainer: {
    position: 'absolute',
    bottom: 150,
    alignItems: 'center',
  },
  loginText: {
    color: '#333',
    fontSize: 16,
    marginTop: 600,
    textDecorationLine: 'underline',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 200,
    zIndex: 1
  }
}); 