import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import database from './database/database';
import { useAuth } from './contexts/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // Acessa a função de login do AuthContext
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleLogin = async () => {
    if (!selectedValue || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const usuario = await database.loginUsuario(email, senha);
      if (usuario && usuario.tipo === (selectedValue === 'op1' ? 'agricultor' : 'consumidor')) {
        login(usuario); // Atualiza o AuthContext com os dados do usuário
        router.replace('/home'); // Redireciona para a tela home
      } else {
        Alert.alert('Erro', 'Email, senha ou tipo incorretos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao realizar login');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/backgound.png')} style={styles.fundoImg} />
      <View style={styles.backOp} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.backLog}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

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
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput 
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity 
            style={styles.buttonContainer} 
            activeOpacity={0.7}
            onPress={handleLogin}
          >
            <Image 
              source={require('../assets/buttonImg.png')} 
              style={styles.buttonImag}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.createAccountWrapper}>
          <Link href="/tabs/cadastro" asChild>
            <TouchableOpacity>
              <Text style={styles.createAccountText}>Criar conta</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    resizeMode: 'cover'
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fundoImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  backOp: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#80BD1C',
    opacity: 0.43,
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
    width: '80%',
    marginTop: 30,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
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
  buttonWrapper: {
    marginTop: -160,
    alignItems: 'center',
  
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  buttonImag: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  createAccountWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  createAccountText: {
    color: '#333',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
