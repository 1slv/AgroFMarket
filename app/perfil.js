import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import database from './database/database';
import { useAuth } from './contexts/AuthContext';

export default function Perfil() {
  const router = useRouter();
  const { user, login, logout } = useAuth(); // Acessa o usuário e funções do AuthContext
  const [nome, setNome] = useState(user?.nome || '');
  const [telefone, setTelefone] = useState(user?.telefone || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (user) {
      // Atualiza os campos sempre que o usuário no contexto mudar
      setNome(user.nome);
      setTelefone(user.telefone);
      setEmail(user.email);
    } else {
      // Redireciona para a tela de login se não houver usuário
      router.replace('/');
    }
  }, [user]);

  const handleSalvar = async () => {
    if (!nome || !email || !telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const updatedUser = await database.atualizarUsuario(user.id, nome, email, telefone);
      login(updatedUser); // Atualiza o AuthContext com os novos dados
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar dados');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Você saiu da conta.', [
      { 
        text: 'OK', 
        onPress: () => {
          logout(); // Limpa o AuthContext
          router.replace('/'); // Redireciona para a página de login
        } 
      }
    ]);
  };

  // Se o usuário não estiver autenticado, não renderiza nada (useEffect já redireciona)
  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.card}>
        <Image source={require('../assets/profile.png')} style={styles.profileImg} />
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleSalvar}>
            <Text style={styles.buttonTxt}>SALVAR ALTERAÇÕES</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rodape}>
        <Link href="/home" asChild>
          <TouchableOpacity>
            <Image source={require('../assets/home.png')} style={styles.homeImg}/>  
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
  },
  logo: {
    width: 266,
    height: 177,
    marginTop: 40,
    position: "absolute"
  },
  card: {
    width: 360,
    backgroundColor: '#ffff',
    marginTop: 230,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
  },
  profileImg: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    height: 52,
    marginTop: 20,
    backgroundColor: '#CC8918',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rodape: {
    width: '100%',
    height: 69,
    backgroundColor: '#CC8918',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  homeImg: {
    height: 45,
    width: 45,
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});