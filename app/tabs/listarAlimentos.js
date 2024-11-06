import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import database from '../database/database';
import { useRouter } from 'expo-router';

export default function ListarAlimentos() {
  const { user } = useAuth();
  const router = useRouter();
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    const fetchAlimentos = async () => {
      try {
        const alimentosAgricultor = await database.getAlimentosAgricultor(user.id);
        setAlimentos(alimentosAgricultor);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os alimentos');
      }
    };

    fetchAlimentos();
  }, []);

  const renderAlimento = ({ item }) => (
    <View style={styles.alimentoItem}>
      <Text style={styles.alimentoNome}>{item.nome}</Text>
      <Text style={styles.alimentoDetalhes}>Preço: R$ {item.preco.toFixed(2)}</Text>
      <Text style={styles.alimentoDetalhes}>Quantidade: {item.quantidade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Alimentos</Text>

      <FlatList
        data={alimentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAlimento}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum alimento adicionado.</Text>}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/tabs/adicionarAlimento')}>
        <Text style={styles.buttonText}>Adicionar Novo Alimento</Text>
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
  alimentoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  alimentoNome: {
    fontSize: 18,
    color: '#333',
  },
  alimentoDetalhes: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#80BD1C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 