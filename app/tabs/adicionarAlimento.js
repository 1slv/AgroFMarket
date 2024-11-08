import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../contexts/AuthContext';
import database from '../database/database';
import { useRouter } from 'expo-router';

export default function AdicionarAlimento() {
  const { user } = useAuth();
  const router = useRouter();
  const [hortaId, setHortaId] = useState('');
  const [nomeAlimento, setNomeAlimento] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [hortas, setHortas] = useState([]);

  useEffect(() => {
    const fetchHortas = async () => {
      await carregarHortas();
    };
    fetchHortas();
  }, []);

  const carregarHortas = async () => {
    try {
      const hortasDoAgricultor = await database.getHortasAgricultor(user.id);
      console.log('Hortas do agricultor:', hortasDoAgricultor);
      setHortas(hortasDoAgricultor);
    } catch (error) {
      console.error('Erro ao carregar hortas:', error);
      Alert.alert('Erro', 'Erro ao carregar hortas');
    }
  };

  const handleAdicionarAlimento = async () => {
    if (!hortaId || !nomeAlimento || !preco || !quantidade) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Verificar se o hortaId selecionado existe
    const hortaExiste = hortas.find(horta => horta.id === Number(hortaId));
    if (!hortaExiste) {
      Alert.alert('Erro', 'Horta selecionada não existe');
      return;
    }

    try {
      const novoAlimento = await database.adicionarAlimento(Number(hortaId), nomeAlimento, parseFloat(preco), parseInt(quantidade, 10));
      if (!novoAlimento) {
        throw new Error('Alimento não foi adicionado corretamente.');
      }
      Alert.alert('Sucesso', 'Alimento adicionado com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/home') }
      ]);
      console.log('Novo alimento adicionado:', novoAlimento);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao adicionar alimento.');
      console.error('Erro ao adicionar alimento:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Alimento</Text>

      <Picker
        selectedValue={hortaId}
        style={styles.picker}
        onValueChange={(itemValue) => setHortaId(itemValue)}
      >
        <Picker.Item label="Selecione uma horta" value="" />
        {hortas.map(horta => (
          <Picker.Item key={horta.id} label={horta.nome} value={horta.id.toString()} />
        ))}
      </Picker>

      {hortas.length === 0 && (
        <Text style={styles.noHortaText}>Você não adicionou nenhuma horta ainda.</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Nome do Alimento"
        value={nomeAlimento}
        onChangeText={setNomeAlimento}
      />

      <TextInput
        style={styles.input}
        placeholder="Preço (R$)"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAdicionarAlimento}>
        <Text style={styles.buttonText}>Adicionar Alimento</Text>
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
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#80BD1C',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
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
  noHortaText: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 15,
  },
}); 