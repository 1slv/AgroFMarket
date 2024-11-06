import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from './contexts/AuthContext';
import database from './database/database'; // Certifique-se de importar o database

export default function Home() {
  const { user } = useAuth(); // Acessa os dados do usuário do AuthContext

  // Função para buscar todas as hortas e seus alimentos
  const hortasDisponiveis = database.getTodasHortas();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {user && user.tipo === 'agricultor' && (
        <Text style={styles.welcomeText}>Bem-vindo, Agricultor {user.nome}!</Text>
      )}

      {user && user.tipo === 'consumidor' && (
        <Text style={styles.welcomeText}>Bem-vindo, {user.nome}!</Text>
      )}

      {/* Botões para Agricultor */}
      {user && user.tipo === 'agricultor' && (
        <View style={styles.agricultorContainer}>
          <Link href="/tabs/adicionarHorta" asChild>
            <TouchableOpacity style={styles.agricultorButton}>
              <Text style={styles.agricultorButtonText}>Adicionar Horta</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/tabs/adicionarAlimento" asChild>
            <TouchableOpacity style={styles.agricultorButton}>
              <Text style={styles.agricultorButtonText}>Adicionar Alimento</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {/* Botões para Consumidor */}
      {user && user.tipo === 'consumidor' && (
        <ScrollView style={styles.consumidorContainer}>
          <Text style={styles.title}>Agricultores Familiares Disponíveis</Text>
          <Text style={styles.title2}>Disponível</Text>

          {hortasDisponiveis.length === 0 && (
            <Text style={styles.noHortasText}>Nenhuma horta disponível no momento.</Text>
          )}

          {hortasDisponiveis.map((horta) => (
            <View key={horta.id} style={styles.card}>
              <Image source={require('../assets/horta.png')} style={styles.hortaImg} />
              <View style={styles.cardInfo}>
                <Text style={styles.hortaTxt}>{horta.nome}</Text>
                <Text style={styles.localizacaoTxt}>Localização: {horta.localizacao}</Text>
                <Text style={styles.alimentosTitle}>Alimentos Disponíveis:</Text>
                {horta.alimentos.length === 0 ? (
                  <Text style={styles.noAlimentosText}>Nenhum alimento disponível.</Text>
                ) : (
                  horta.alimentos.map((alimento) => (
                    <View key={alimento.id} style={styles.alimentoItem}>
                      <Text style={styles.alimentoNome}>{alimento.nome}</Text>
                      <Text style={styles.alimentoDetalhe}>Preço: R$ {alimento.preco}</Text>
                      <Text style={styles.alimentoDetalhe}>Quantidade: {alimento.quantidade}</Text>
                    </View>
                  ))
                )}
                <Link href="/pedido" asChild>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTxt}>REALIZAR PEDIDO</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.rodape}>
        <Link href="/perfil" asChild>
          <TouchableOpacity>
            <Image source={require('../assets/profile.png')} style={styles.profileImg} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 80, // Espaço para o rodapé
  },
  logo: {
    width: 266,
    height: 177,
    marginTop: 60,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  agricultorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 30,
  },
  agricultorButton: {
    backgroundColor: '#80BD1C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    flex: 1,
  },
  agricultorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  consumidorContainer: {
    width: '90%',
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    color: '#80BD1C',
    marginBottom: 10,
    textAlign: 'center',
  },
  title2: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  noHortasText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  hortaImg: {
    width: '100%',
    height: 177,
    resizeMode: 'cover',
    marginBottom: 15,
    borderRadius: 8,
  },
  cardInfo: {
    width: '100%',
  },
  hortaTxt: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  localizacaoTxt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'left',
  },
  alimentosTitle: {
    fontSize: 16,
    color: '#80BD1C',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  noAlimentosText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  alimentoItem: {
    marginBottom: 10,
  },
  alimentoNome: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  alimentoDetalhe: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#CC8918',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'flex-start', // Alinha o botão à esquerda
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rodape: {
    width: '100%',
    height: 69,
    backgroundColor: '#CC8918',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileImg: {
    height: 45,
    width: 45,
  },
});
