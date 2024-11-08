import React, { createContext, useContext, useState } from 'react';
import database from '../database/database';

// Criação do Contexto
const AuthContext = createContext();

// Provedor do Contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Função para atualizar o contexto após login
  const login = async (usuario) => {
    try {
      // Se o usuário for um agricultor, buscar suas hortas
      if (usuario.tipo === 'agricultor') {
        const hortas = await database.getHortasAgricultor(usuario.id);
        setUser({ ...usuario, hortas });
      } else {
        // Para consumidores, inicializar hortas como array vazio
        setUser({ ...usuario, hortas: [] });
      }
      console.log('Usuário autenticado no contexto:', { ...usuario });
    } catch (error) {
      console.error('Erro ao carregar hortas do usuário:', error);
    }
  };

  // Função para logout
  const logout = () => {
    setUser(null);
    console.log('Usuário desautenticado no contexto');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para facilitar o uso do Contexto
export const useAuth = () => {
  return useContext(AuthContext);
}; 