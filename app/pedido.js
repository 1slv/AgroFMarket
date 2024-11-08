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
  if (user) {
    console.log('Tipo do usuário:', user.tipo);
    if (user.tipo === 'agricultor') {
      console.log('Número de hortas:', user.hortas.length);
    }
  }

  const [hortas, setHortas] = useState([]);
  const [selectedHortaId, setSelectedHortaId] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchHortas = async () => {
      await carregarHortas();
    };
    fetchHortas();
  }, []);

  const carregarHortas = async () => {
    try {
      const hortasDoConsumidor = await database.getTodasHortas();
      console.log('Hortas disponíveis:', hortasDoConsumidor);
      setHortas(hortasDoConsumidor);
    } catch (error) {
      console.error('Erro ao carregar hortas:', error);
      Alert.alert('Erro', 'Erro ao carregar hortas');
    }
  };

  const carregarProdutos = async (hortaId) => {
    try {
      const alimentos = await database.getAlimentosHorta(hortaId);
      console.log(`Alimentos recebidos para horta ID ${hortaId}:`, alimentos);
      const produtosInicializados = alimentos.map((alimento) => ({
        id: Number(alimento.id),
        nome: alimento.nome,
        preco: Number(alimento.preco),
        quantidade: 0,
        estoque: Number(alimento.quantidade),
      }));
      console.log('Produtos Inicializados:', produtosInicializados);
      setProdutos(produtosInicializados);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      Alert.alert('Erro', 'Erro ao carregar produtos');
    }
  };

  const selecionarHorta = (hortaId) => {
    console.log(`Horta selecionada: ID ${hortaId} (tipo: ${typeof hortaId})`);
    setSelectedHortaId(hortaId);
    carregarProdutos(hortaId);
    console.log(`Horta ID ${hortaId} selecionada.`);
  };

  const adicionarProduto = (id) => {
    console.log(`adicionarProduto chamado com id: ${id} (tipo: ${typeof id})`);
    setProdutos((prevProdutos) => {
      const updatedProdutos = prevProdutos.map((produto) =>
        produto.id === id && produto.quantidade < produto.estoque
          ? { ...produto, quantidade: produto.quantidade + 1 }
          : produto
      );

      const produtoSelecionado = updatedProdutos.find((produto) => produto.id === id);

      if (produtoSelecionado.quantidade > produtoSelecionado.estoque) {
        Alert.alert(
          'Estoque',
          `Você não pode selecionar mais de ${produtoSelecionado.estoque} unidades de ${produtoSelecionado.nome}.`
        );
        // Reverter a quantidade se exceder o estoque
        return prevProdutos;
      } else {
        console.log(`Produto ID ${id} incrementado. Quantidade atual: ${produtoSelecionado.quantidade}`);
      }

      console.log('Estado atualizado de produtos:', updatedProdutos);
      return updatedProdutos;
    });
  };

  const removerProduto = (id) => {
    console.log(`removerProduto chamado com id: ${id} (tipo: ${typeof id})`);
    setProdutos((prevProdutos) => {
      const updatedProdutos = prevProdutos.map((produto) =>
        produto.id === id && produto.quantidade > 0
          ? { ...produto, quantidade: produto.quantidade - 1 }
          : produto
      );
      const produtoAtualizado = updatedProdutos.find((p) => p.id === id);
      console.log(`Produto ID ${id} decrementado. Quantidade atual: ${produtoAtualizado.quantidade}`);
      console.log('Estado atualizado de produtos:', updatedProdutos);
      return updatedProdutos;
    });
  };

  useEffect(() => {
    console.log('Produtos state updated:', produtos);
  }, [produtos]);

  const renderHortaItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.hortaItem,
        selectedHortaId === item.id && styles.hortaItemSelecionado,
      ]}
      onPress={() => selecionarHorta(item.id)}
    >
      <Text
        style={[
          styles.hortaNome,
          selectedHortaId === item.id && styles.hortaNomeSelecionado,
        ]}
      >
        {item.nome}
      </Text>
    </TouchableOpacity>
  );

  const renderProduto = ({ item }) => (
    <View style={styles.produtoCard}>
      <View style={styles.produtoInfo}>
        <Text style={styles.nomeProduto}>{item.nome}</Text>
        <Text style={styles.preco}>Preço: R$ {item.preco.toFixed(2)}</Text>
        <Text style={styles.estoque}>Estoque: {item.estoque}</Text>
      </View>
      <View style={styles.controleQuantidade}>
        <TouchableOpacity
          style={[
            styles.botaoControle,
            item.quantidade >= item.estoque && styles.botaoControleDesabilitado,
          ]}
          onPress={() => adicionarProduto(item.id)}
          disabled={item.quantidade >= item.estoque}
        >
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
        <Text style={styles.quantidade}>{item.quantidade}</Text>
        <TouchableOpacity
          style={[
            styles.botaoControle,
            item.quantidade === 0 && styles.botaoControleDesabilitado,
          ]}
          onPress={() => removerProduto(item.id)}
          disabled={item.quantidade === 0}
        >
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const confirmarPedido = async () => {
    if (resumoPedido.itens.length === 0) {
      Alert.alert('Erro', 'Você precisa selecionar pelo menos um produto.');
      return;
    }

    if (!selectedHortaId) {
      Alert.alert('Erro', 'Por favor, selecione uma horta.');
      return;
    }

    try {
      const mensagemConfirmacao = await database.processarPedido(resumoPedido.itens);
      Alert.alert('Sucesso', mensagemConfirmacao);

      router.push({
        pathname: '/finalizar',
        params: {
          produtos: JSON.stringify(resumoPedido.itens),
          hortaId: selectedHortaId,
          total: resumoPedido.total.toString(),
        },
      });
      console.log('Pedido confirmado com produtos:', resumoPedido.itens);
    } catch (error) {
      console.error('Erro ao confirmar pedido:', error);
      // Assegure-se de que 'error' seja uma string
      const mensagemErro =
        typeof error === 'string'
          ? error
          : error.message || 'Ocorreu um erro inesperado.';
      Alert.alert('Erro', mensagemErro);
    }
  };

  const confirmarPedidoAtualizado = async () => {
    if (resumoPedido.itens.length === 0) {
      Alert.alert('Erro', 'Você precisa selecionar pelo menos um produto.');
      return;
    }

    if (!selectedHortaId) {
      Alert.alert('Erro', 'Por favor, selecione uma horta.');
      return;
    }

    try {
      const mensagemConfirmacao = await database.processarPedido(resumoPedido.itens);
      Alert.alert('Sucesso', mensagemConfirmacao);

      router.push({
        pathname: '/finalizar',
        params: {
          produtos: JSON.stringify(resumoPedido.itens),
          hortaId: selectedHortaId,
          total: resumoPedido.total.toString(),
        },
      });
      console.log('Pedido confirmado com produtos:', resumoPedido.itens);
    } catch (error) {
      console.error('Erro ao confirmar pedido:', error);
      // Assegure-se de que 'error' seja uma string
      const mensagemErro =
        typeof error === 'string'
          ? error
          : error.message || 'Ocorreu um erro inesperado.';
      Alert.alert('Erro', mensagemErro);
    }
  };

  const confirmarPedidoFinal = async () => {
    confirmarPedido();
  };

  const resumoPedido = {
    itens: produtos.filter((produto) => produto.quantidade > 0).map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidadeSelecionada: produto.quantidade,
    })),
    total: produtos
      .reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0)
      .toFixed(2),
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
        <Picker.Item label="Selecione uma horta" value={null} />
        {hortas.map((horta) => (
          <Picker.Item key={horta.id} label={horta.nome} value={horta.id} />
        ))}
      </Picker>

      {/* Verificação de Hortas Existentes */}
      {hortas.length === 0 && (
        <Text style={styles.noHortaText}>
          Nenhuma horta disponível. Adicione uma horta primeiro.
        </Text>
      )}

      {/* Lista de Produtos da Horta Selecionada */}
      {selectedHortaId && (
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
      )}

      {/* Botão de Confirmar Pedido */}
      <TouchableOpacity
        style={[
          styles.botaoConfirmar,
          resumoPedido.itens.length === 0 && styles.botaoConfirmarDesabilitado,
        ]}
        onPress={confirmarPedidoFinal}
        disabled={resumoPedido.itens.length === 0 || !selectedHortaId}
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
    marginTop: 40,
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
    color: '#80BD1C',
    textAlign: 'center',
    fontSize: 16,
  },
  hortaNomeSelecionado: {
    color: '#fff',
  },
  noHortaText: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
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
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
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
  estoque: {
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
  botaoControleDesabilitado: {
    backgroundColor: '#cccccc',
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
  botaoConfirmarDesabilitado: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
  botaoConfirmarTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PedidoScreen;
