import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';

const FinalizarScreen = () => {
  const router = useRouter();
  const { produtos, hortaId, total } = useSearchParams();

  let produtosSelecionados = [];
  try {
    produtosSelecionados = produtos ? JSON.parse(produtos) : [];
  } catch (error) {
    Alert.alert('Erro', 'Erro ao processar os produtos do pedido.');
    produtosSelecionados = [];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmação de Pedido</Text>

      <Text style={styles.subtitle}>Horta Selecionada: ID {hortaId}</Text>

      <View style={styles.produtosContainer}>
        {produtosSelecionados.map((item) => (
          <View key={item.id} style={styles.produtoItem}>
            <Text style={styles.produtoNome}>{item.nome}</Text>
            <Text style={styles.produtoQuantidade}>
              Quantidade: {item.quantidadeSelecionada}
            </Text>
            <Text style={styles.produtoPreco}>
              Preço Unitário: R$ {parseFloat(item.preco).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.total}>Total: R$ {parseFloat(total).toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => router.push('/')}
      >
        <Text style={styles.botaoTexto}>Voltar para o Início</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    marginTop: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  produtosContainer: {
    marginVertical: 20,
  },
  produtoItem: {
    borderWidth: 1,
    borderColor: '#80BD1C',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  produtoQuantidade: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  produtoPreco: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  total: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  botaoVoltar: {
    backgroundColor: '#80BD1C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FinalizarScreen;