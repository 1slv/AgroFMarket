import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import database from '../database/database';
import { useRouter } from 'expo-router';

export default function AdicionarHorta() {
  const { user } = useAuth();
  const router = useRouter();
  const [nomeHorta, setNomeHorta] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  const handleAdicionarHorta = () => {
    if (!nomeHorta || !localizacao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const horta = database.adicionarHorta(user.id, nomeHorta, localizacao);
      Alert.alert('Sucesso', 'Horta adicionada com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/home') }
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message);
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#80BD1C',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#80BD1C',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#80BD1C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 