import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import database from '../database/database';

export default function ListarHortas() {
  const { user } = useAuth();
  const [hortas, setHortas] = useState([]);

  useEffect(() => {
    carregarHortas();
  }, []);

  const carregarHortas = () => {
    try {
      const hortasDB = database.getHortasAgricultor(user.id);
      setHortas(hortasDB);
    } catch (error) {
      console.error('Erro ao carregar hortas:', error);
    }
  };

  const renderHorta = ({ item }) => (
    <View style={styles.hortaCard}>
      <Text style={styles.nomeHorta}>{item.nome}</Text>
      <Text style={styles.localizacao}>{item.localizacao}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minhas Hortas</Text>
      <FlatList
        data={hortas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHorta}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.noHortaText}>Nenhuma horta cadastrada.</Text>}
      />
    </SafeAreaView>
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
  list: {
    paddingBottom: 16,
  },
  hortaCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  nomeHorta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#80BD1C',
  },
  localizacao: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  noHortaText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
    fontSize: 16,
  },
}); 