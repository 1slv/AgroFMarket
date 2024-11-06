import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import database from './database/database';

const FinalizarPedido = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  console.log('Parâmetros recebidos:', params);

  if (!params.produtos) {
    Alert.alert('Erro', 'Nenhum produto foi passado para a tela de finalização.');
    return null;
  }

  let produtosArray = [];
  
  try {
    produtosArray = JSON.parse(params.produtos);
    console.log('Produtos recebidos após parse:', produtosArray);
  } catch (error) {
    Alert.alert('Erro', 'Produtos inválidos.');
    return null;
  }

  // Exemplo de uso da função getTodasHortas
  useEffect(() => {
    try {
      const todasHortas = database.getTodasHortas();
      console.log('Todas as Hortas:', todasHortas);
      // Faça algo com todasHortas, se necessário
    } catch (error) {
      console.error('Erro ao obter todas as hortas:', error);
      Alert.alert('Erro', 'Erro ao obter todas as hortas.');
    }
  }, []);

  // Estados necessários
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    complemento: '',
  });
  
  const [formaPagamento, setFormaPagamento] = useState('');
  const [precisaTroco, setPrecisaTroco] = useState(false);
  const [valorTroco, setValorTroco] = useState('');

  const resumoPedido = {
    itens: produtosArray.map(item => ({
      id: item.id, // Adicionado o campo id
      nome: item.nome,
      quantidadeSelecionada: item.quantidade, // Renomeado para quantidadeSelecionada
      preco: item.preco,
    })),
    total: produtosArray.reduce((total, item) => total + (item.preco * item.quantidade), 0),
  };

  console.log('Resumo do Pedido:', resumoPedido);

  // Função auxiliar para verificar se o formulário está válido
  const isFormValid = () => {
    const enderecoPreenchido = 
      endereco.rua.trim() && 
      endereco.numero.trim() && 
      endereco.bairro.trim() && 
      endereco.cidade.trim();
    
    const pagamentoPreenchido = formaPagamento.trim();
    
    if (formaPagamento === 'dinheiro' && precisaTroco) {
      return enderecoPreenchido && pagamentoPreenchido && valorTroco.trim();
    }

    return enderecoPreenchido && pagamentoPreenchido;
  };

  const confirmarPedido = () => {
    if (!isFormValid()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const pedido = {
      endereco: endereco,
      forma_pagamento: formaPagamento,
      precisa_troco: precisaTroco,
      valor_troco: precisaTroco ? parseFloat(valorTroco) : null,
      valor_total: resumoPedido.total,
      itens: resumoPedido.itens,
    };

    console.log('Pedido a ser criado:', pedido);

    try {
      const novoPedido = database.criarPedido(pedido);
      Alert.alert('Sucesso', 'Pedido realizado com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/home') }
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Finalizar Pedido</Text>

        {/* Resumo dos Produtos */}
        <View style={styles.resumoContainer}>
          {resumoPedido.itens.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemQuantidade}>{item.quantidadeSelecionada}x</Text>
              <Text style={styles.itemPreco}>R$ {(item.quantidadeSelecionada * item.preco).toFixed(2)}</Text>
            </View>
          ))}
          <Text style={styles.total}>Total: R$ {resumoPedido.total.toFixed(2)}</Text>
        </View>

        {/* Formulário de Endereço */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Endereço:</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua"
            value={endereco.rua}
            onChangeText={(text) => setEndereco({ ...endereco, rua: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Número"
            value={endereco.numero}
            onChangeText={(text) => setEndereco({ ...endereco, numero: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={endereco.bairro}
            onChangeText={(text) => setEndereco({ ...endereco, bairro: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={endereco.cidade}
            onChangeText={(text) => setEndereco({ ...endereco, cidade: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            value={endereco.complemento}
            onChangeText={(text) => setEndereco({ ...endereco, complemento: text })}
          />
        </View>

        {/* Formulário de Pagamento */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Forma de Pagamento:</Text>
          <TouchableOpacity 
            style={[styles.paymentOption, formaPagamento === 'dinheiro' && styles.paymentOptionSelected]}
            onPress={() => setFormaPagamento('dinheiro')}
          >
            <Text style={styles.paymentText}>Dinheiro</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.paymentOption, formaPagamento === 'cartao' && styles.paymentOptionSelected]}
            onPress={() => setFormaPagamento('cartao')}
          >
            <Text style={styles.paymentText}>Cartão</Text>
          </TouchableOpacity>
        </View>

        {/* Opção de Troco */}
        {formaPagamento === 'dinheiro' && (
          <View style={styles.trocoContainer}>
            <Text style={styles.label}>Precisa de troco?</Text>
            <View style={styles.trocoOptions}>
              <TouchableOpacity 
                style={[
                  styles.trocoOption,
                  precisaTroco && styles.trocoOptionSelecionada
                ]}
                onPress={() => setPrecisaTroco(true)}
              >
                <Text style={styles.trocoOptionTexto}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.trocoOption,
                  !precisaTroco && styles.trocoOptionSelecionada
                ]}
                onPress={() => setPrecisaTroco(false)}
              >
                <Text style={styles.trocoOptionTexto}>Não</Text>
              </TouchableOpacity>
            </View>
            {precisaTroco && (
              <TextInput
                style={styles.trocoInput}
                value={valorTroco}
                onChangeText={setValorTroco}
                placeholder="Digite o valor para troco"
                keyboardType="numeric"
              />
            )}
          </View>
        )}

        {/* Botão de Confirmar Pedido */}
        <TouchableOpacity 
          style={[
            styles.botaoConfirmar,
            !isFormValid() && styles.botaoConfirmarDesabilitado
          ]}
          onPress={confirmarPedido}
          disabled={!isFormValid()}
        >
          <Text style={styles.botaoConfirmarTexto}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </ScrollView>
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
  resumoContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemNome: {
    fontSize: 16,
    color: '#333',
  },
  itemQuantidade: {
    fontSize: 16,
    color: '#333',
  },
  itemPreco: {
    fontSize: 16,
    color: '#333',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
    color: '#80BD1C',
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#80BD1C',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#80BD1C',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  paymentOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#80BD1C',
    borderRadius: 8,
    marginBottom: 10,
  },
  paymentOptionSelected: {
    backgroundColor: '#80BD1C',
  },
  paymentText: {
    color: '#fff',
    textAlign: 'center',
  },
  trocoContainer: {
    marginBottom: 20,
  },
  trocoOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  trocoOption: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#80BD1C',
    borderRadius: 8,
    alignItems: 'center',
  },
  trocoOptionSelecionada: {
    backgroundColor: '#80BD1C',
  },
  trocoOptionTexto: {
    color: '#fff',
  },
  trocoInput: {
    borderWidth: 1,
    borderColor: '#80BD1C',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  botaoConfirmar: {
    backgroundColor: '#CC8918',
    padding: 16,
    margin: 16,
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

export default FinalizarPedido;