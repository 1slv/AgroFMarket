//NAO MEXER NESSE ARQUIVO

//import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { router } from 'expo-router';
import { useUsuariosDatabase, UsuariosDatabase } from '../database/useUsuariosDatabase';
import { useEffect, useState } from 'react';

export default function LoginScreen() {

  const navigation = useNavigation(); 
  const usuariosControle = useUsuariosDatabase();

  const handleLogin = () => {
    router.push('/cadastro'); 
  };

  const handleSignUp = () => {
    router.push('/tabs/home');
  };

  useEffect(() => {
    listar()
  },[])

  const listar = async () => {
    const resultado = await usuariosControle.listar()
    console.log(resultado)
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Faça login em sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Insira seu endereço de email"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Insira sua senha"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.signupText}>
          Ainda não tem conta? <Text style={styles.signupLink}>Faça seu cadastro!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0B3B60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#007bff',
    marginBottom: 20,
  },
  signupText: {
    color: '#333',
  },
  signupLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

