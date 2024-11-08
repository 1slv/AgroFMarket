import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import database from '../database/database';
import { useRouter } from 'expo-router';

const AdicionarHorta = () => {
  const { user, login } = useAuth(); // Acessa o usuário e a função de login para atualizar o contexto
  const router = useRouter();
  const [nomeHorta, setNomeHorta] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  const handleAdicionarHorta = async () => {
    if (!nomeHorta.trim() || !localizacao.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const novaHorta = await database.adicionarHorta(user.id, nomeHorta, localizacao);
      
      // Verifica se a nova horta foi criada corretamente
      if (!novaHorta) {
        throw new Error('Horta não foi criada corretamente.');
      }

      Alert.alert('Sucesso', 'Horta adicionada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            // Atualizar o contexto do usuário com a nova horta
            const updatedUser = {
              ...user,
              hortas: [...(user.hortas || []), novaHorta], // Usa um array vazio se hortas for undefined
            };
            login(updatedUser); // Atualiza o AuthContext
            router.replace('/tabs/adicionarAlimento'); // Redireciona para a tela de adicionar alimento
          },
        },
      ]);
      console.log('Nova horta adicionada:', novaHorta);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao adicionar horta.');
      console.error('Erro ao adicionar horta:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Horta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome da Horta"
        value={nomeHorta}
        onChangeText={setNomeHorta}
      />

      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdicionarHorta}>
        <Text style={styles.buttonText}>Adicionar Horta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdicionarHorta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#80BD1C',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    height: 52,
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
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 