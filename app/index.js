import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handlePedidoPress = () => {
    if (!selectedValue || !email || !senha) {
      Alert.alert(
        "Campos Incompletos",
        "Por favor, preencha todos os campos antes de continuar.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/backgound.png')} style={styles.fundoImg}/>
      <View style={styles.backOp}/>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.backLog}>
          <Image source={require('../assets/logo.png')} style={styles.logo}/>

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
          {selectedValue && email && senha ? (
            <Link href="/pedido" asChild>
              <TouchableOpacity 
                style={styles.buttonContainer} 
                activeOpacity={0.7}
              >
                <Image 
                  source={require('../assets/buttonImg.png')} 
                  style={styles.buttonImag}
                />
              </TouchableOpacity>
            </Link>
          ) : (
            <TouchableOpacity 
              style={styles.buttonContainer} 
              onPress={handlePedidoPress}
              activeOpacity={0.7}
            >
              <Image 
                source={require('../assets/buttonImg.png')} 
                style={styles.buttonImag}
              />
            </TouchableOpacity>
          )}
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
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  fundoImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backOp: {
    width:430,
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
    marginTop: 100,
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
    position: 'absolute',
    bottom: 220,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  buttonImag: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  createAccountWrapper: {
    position: 'absolute',
    bottom: 150,
  },
  createAccountText: {
    color: '#333',
    fontSize: 16,
    marginTop: 200,
    textDecorationLine: 'underline',
  },
});
