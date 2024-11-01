import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';

export default function Consultas() {
  const handleSignUp = () => {
    router.push('/home');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Consultas</Text>

      <TouchableOpacity style={styles.consultaButton} onPress={handleSignUp}>
        <Text style={styles.consultaText}>Agendar outra consulta</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Próximas consultas</Text>
      <View style={styles.consultaContainer}>
        <Text style={styles.consultaDetail}>Dra. Ana Lúcia - 03/02/2023</Text>
        <Image source={require('../../assets/img_doutora.png')} style={styles.logo} />
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>Consultas passadas</Text>
      <View style={styles.consultaContainer2}>
        <Text style={styles.consultaDetail}>Dra. Ana Lúcia - 01/01/2023</Text>
        <Image source={require('../../assets/img_doutora.png')} style={styles.logo} />
        <Text style={styles.consultaDetail}>Angiologista</Text>
        <TouchableOpacity style={styles.agendarButton} onPress={handleSignUp}>
          <Text style={styles.agendarText}>Agendar consulta</Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#339CFF',
    textAlign: 'center',
  },
  consultaButton: {
    height: 50,
    backgroundColor: '#0B3B60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    //color: 'red',
  },
  consultaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#339CFF',
  },
  consultaContainer: {
    marginBottom: 15,
    margin: 10,
    backgroundColor: '#',
    borderRadius: 10,
    height: '100',
  },
  consultaDetail: {
    color: '#333',
    marginBottom: 5,
  },
  cancelButton: {
    height: 40,
    backgroundColor: '#0B3B60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cancelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  agendarButton: {
    height: 40,
    backgroundColor: '#0B3B60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  agendarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  consultaContainer2: {
    marginBottom: 15,
    margin: 10,
    backgroundColor: '#C2E1FF',
    borderRadius: 10,
    height: '100',
  },
  logo: {
    margin: 5,
  },
});
