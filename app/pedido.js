import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from './contexts/AuthContext';
import database from './database/database';
import { useRouter } from 'expo-router';

console.log('Objeto database importado:', database);

const PedidoScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  console.log('Usuário autenticado:', user);

  const [hortas, setHortas] = useState([]);
  const [selectedHortaId, setSelectedHortaId] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    console.log('Iniciando carregamento das hortas...');
    carregarHortas();
  }, []);

  const carregarHortas = () => {
    try {
      if (!user || !user.id) {
        throw new Error('Usuário não autenticado ou ID inexistente.');
      }

      console.log('Usuário autenticado:', user);
      const hortasDoAgricultor = database.getHortasAgricultor(user.id);
      console.log('Hortas retornadas:', hortasDoAgricultor);

      setHortas(hortasDoAgricultor);
      console.log('Estado hortas atualizado:', hortasDoAgricultor);

      if (hortasDoAgricultor.length > 0) {
        setSelectedHortaId(hortasDoAgricultor[0].id);
        console.log(`Horta selecionada: ${hortasDoAgricultor[0].id}`);
        carregarProdutos(hortasDoAgricultor[0].id);
      } else {
        console.log('Nenhuma horta disponível.');
      }
    } catch (error) {
      console.error('Erro ao carregar hortas:', error);
      Alert.alert('Erro', 'Erro ao carregar hortas');
    }
  };

  const carregarProdutos = (hortaId) => {
    try {
      const produtosDaHorta = database.getAlimentosHorta(hortaId);
      console.log('Produtos da horta:', produtosDaHorta);
      setProdutos(produtosDaHorta.map((p) => ({ ...p, quantidade: 0 })));
      console.log('Estado produtos atualizado:', produtosDaHorta.map((p) => ({ ...p, quantidade: 0 })));
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      Alert.alert('Erro', 'Erro ao carregar produtos');
    }
  };

  const selecionarHorta = (hortaId) => {
    console.log(`Selecionando horta ID: ${hortaId}`);
    setSelectedHortaId(hortaId);
    carregarProdutos(hortaId);
  };

  const adicionarProduto = (id) => {
    setProdutos(
      produtos.map((produto) =>
        produto.id === id
          ? { ...produto, quantidade: produto.quantidade + 1 }
          : produto
      )
    );
    console.log(`Produto ID ${id} incrementado.`);
  };

  const removerProduto = (id) => {
    setProdutos(
      produtos.map((produto) =>
        produto.id === id && produto.quantidade > 0
          ? { ...produto, quantidade: produto.quantidade - 1 }
          : produto
      )
    );
    console.log(`Produto ID ${id} decrementado.`);
  };

  const renderHortaItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.hortaItem,
        selectedHortaId === item.id && styles.hortaItemSelecionado,
      ]}
      onPress={() => selecionarHorta(item.id)}
    >
      <Text style={styles.hortaNome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  const renderProduto = ({ item }) => (
    <View style={styles.produtoCard}>
      <View style={styles.produtoInfo}>
        <Text style={styles.nomeProduto}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)} / unidade</Text>
      </View>

      <View style={styles.controleQuantidade}>
        <TouchableOpacity
          style={styles.botaoControle}
          onPress={() => removerProduto(item.id)}
        >
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantidade}>{item.quantidade}</Text>

        <TouchableOpacity
          style={styles.botaoControle}
          onPress={() => adicionarProduto(item.id)}
        >
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const confirmarPedido = () => {
    const produtosSelecionados = produtos.filter(
      (produto) => produto.quantidade > 0
    );
    if (produtosSelecionados.length === 0) {
      Alert.alert('Erro', 'Você precisa selecionar pelo menos um produto.');
      return;
    }

    router.push({
      pathname: '/finalizar',
      params: { produtos: JSON.stringify(produtosSelecionados) },
    });
    console.log('Pedido confirmado com produtos:', produtosSelecionados);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Realizar Pedido</Text>

      {/* Picker para Selecionar Horta */}
      <Picker
        selectedValue={selectedHortaId}
        style={styles.picker}
        onValueChange={(itemValue) => selecionarHorta(itemValue)}
      >
        {hortas.length > 0 ? (
          hortas.map((horta) => (
            <Picker.Item key={horta.id} label={horta.nome} value={horta.id} />
          ))
        ) : (
          <Picker.Item label="Nenhuma horta disponível" value={null} />
        )}
      </Picker>

      {/* Verificação de Hortas Existentes */}
      {hortas.length === 0 && (
        <Text style={styles.noHortaText}>
          Nenhuma horta disponível. Adicione uma horta primeiro.
        </Text>
      )}

      {/* Lista de Produtos da Horta Selecionada */}
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduto}
        contentContainerStyle={styles.produtoList}
        ListEmptyComponent={
          <Text style={styles.noProdutoText}>
            Nenhum produto disponível nesta horta.
          </Text>
        }
      />

      {/* Botão de Confirmar Pedido */}
      <TouchableOpacity
        style={styles.botaoConfirmar}
        onPress={confirmarPedido}
      >
        <Text style={styles.botaoConfirmarTexto}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  hortaItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#80BD1C',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  hortaItemSelecionado: {
    backgroundColor: '#80BD1C',
  },
  hortaNome: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  noHortaText: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 15,
  },
  produtoList: {
    paddingBottom: 20,
  },
  produtoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#80BD1C',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  produtoInfo: {
    flex: 1,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  preco: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  controleQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoControle: {
    backgroundColor: '#80BD1C',
    padding: 5,
    borderRadius: 5,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantidade: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  noProdutoText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
    fontSize: 16,
  },
  botaoConfirmar: {
    backgroundColor: '#CC8918',
    padding: 16,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoConfirmarTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PedidoScreen;
