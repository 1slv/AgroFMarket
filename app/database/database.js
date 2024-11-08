console.log('Módulo database.js carregado');

// Simulação de banco de dados
const mockUsuarios = [
  {
    id: 1,
    tipo: 'consumidor',
    nome: 'Carlos Silva',
    email: 'carlos@email.com',
    senha: '123456',
    telefone: '14 99999-9999',
  },
  {
    id: 2,
    tipo: 'agricultor',
    nome: 'Maria Oliveira',
    email: 'maria@email.com',
    senha: '123456',
    telefone: '14 98888-8888',
  },
];

let mockHortas = []; // Array para armazenar as hortas
let mockAlimentos = []; // Array para armazenar os alimentos
let mockPedidos = []; // Array para armazenar os pedidos

const database = {
  initDatabase: () => {
    // Adicionar hortas manualmente para o agricultor com ID 2, se necessário
    if (mockHortas.length === 0) {
      const horta1 = database.adicionarHorta(2, 'Horta da Maria', 'Rua das Flores, 123');
      const horta2 = database.adicionarHorta(2, 'Horta do João', 'Avenida Central, 456');
      console.log('Hortas iniciais adicionadas:', [horta1, horta2]);
    }

    // Adicionar alimentos inicialmente, se necessário
    if (mockAlimentos.length === 0) {
      database.adicionarAlimento(1, 'Tomate', 5.0, 100);
      database.adicionarAlimento(1, 'Alface', 3.5, 80);
      database.adicionarAlimento(2, 'Cenoura', 4.0, 60);
      console.log('Alimentos iniciais adicionados.');
    }
  },

  cadastrarUsuario: async (tipo, nome, email, senha, telefone) => {
    return new Promise((resolve, reject) => {
      // Verificar se o email já está registrado
      const emailExistente = mockUsuarios.find((usuario) => usuario.email === email);
      if (emailExistente) {
        console.log('Erro: Email já está registrado:', email);
        return reject(new Error('Email já está registrado.'));
      }

      const novoUsuario = {
        id: mockUsuarios.length + 1,
        tipo,
        nome,
        email,
        senha, // Em produção, a senha deve ser hashada
        telefone,
      };
      mockUsuarios.push(novoUsuario);
      console.log('Novo usuário cadastrado:', novoUsuario);
      resolve(novoUsuario);
    });
  },

  loginUsuario: async (email, senha) => {
    return new Promise((resolve, reject) => {
      const usuario = mockUsuarios.find((u) => u.email === email && u.senha === senha);
      if (usuario) {
        console.log('Usuário logado:', usuario);
        resolve(usuario);
      } else {
        console.log('Credenciais inválidas para o email:', email);
        reject(new Error('Email ou senha inválidos.'));
      }
    });
  },

  atualizarUsuario: async (id, nome, email, telefone) => {
    return new Promise((resolve, reject) => {
      const usuarioIndex = mockUsuarios.findIndex((u) => u.id === id);
      if (usuarioIndex === -1) {
        return reject(new Error('Usuário não encontrado.'));
      }

      // Verificar se o novo email já está em uso por outro usuário
      const emailExistente = mockUsuarios.find((u) => u.email === email && u.id !== id);
      if (emailExistente) {
        return reject(new Error('Email já está em uso por outro usuário.'));
      }

      mockUsuarios[usuarioIndex] = {
        ...mockUsuarios[usuarioIndex],
        nome,
        email,
        telefone,
      };
      console.log('Usuário atualizado:', mockUsuarios[usuarioIndex]);
      resolve(mockUsuarios[usuarioIndex]);
    });
  },

  adicionarHorta: async (agricultorId, nome, localizacao) => {
    return new Promise((resolve, reject) => {
      try {
        // Verificar se o agricultor existe
        const agricultor = mockUsuarios.find(usuario => usuario.id === agricultorId && usuario.tipo === 'agricultor');
        if (!agricultor) {
          throw new Error('Agricultor não encontrado.');
        }

        // Criar nova horta
        const novaHorta = {
          id: mockHortas.length + 1,
          agricultorId,
          nome,
          localizacao,
        };

        mockHortas.push(novaHorta);
        console.log('Nova horta adicionada ao banco de dados:', novaHorta);
        resolve(novaHorta);
      } catch (error) {
        reject(error);
      }
    });
  },

  getHortasAgricultor: async (agricultorId) => {
    return new Promise((resolve, reject) => {
      try {
        const hortas = mockHortas.filter(horta => horta.agricultorId === agricultorId);
        resolve(hortas);
      } catch (error) {
        reject(error);
      }
    });
  },

  getTodasHortas: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockHortas);
      }, 500);
    });
  },

  getAlimentosHorta: async (hortaId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const alimentos = mockAlimentos.filter((a) => a.hortaId === hortaId);
        resolve(alimentos);
      }, 500);
    });
  },

  adicionarAlimento: async (hortaId, nome, preco, quantidade) => {
    return new Promise((resolve, reject) => {
      try {
        // Verificar se a horta existe
        const horta = mockHortas.find((h) => h.id === hortaId);
        if (!horta) {
          throw new Error('Horta não encontrada.');
        }

        // Criar novo alimento
        const novoAlimento = {
          id: mockAlimentos.length + 1,
          hortaId,
          nome,
          preco,
          quantidade, // Estoque disponível
        };

        mockAlimentos.push(novoAlimento);
        console.log('Novo alimento adicionado ao banco de dados:', novoAlimento);
        resolve(novoAlimento);
      } catch (error) {
        reject(error);
      }
    });
  },

  getAlimentosAgricultor: async (agricultorId) => {
    return new Promise((resolve) => {
      const hortaIds = mockHortas
        .filter((horta) => horta.agricultorId === agricultorId)
        .map((horta) => horta.id);
      const alimentos = mockAlimentos.filter((alimento) => hortaIds.includes(alimento.hortaId));
      resolve(alimentos);
    });
  },

  getTodosAlimentos: async () => {
    return new Promise((resolve) => {
      resolve([...mockAlimentos]); // Retorna uma cópia
    });
  },

  criarPedido: async (pedido) => {
    return new Promise((resolve, reject) => {
      console.log('Criando pedido:', pedido); // Log para depuração

      if (!pedido || !pedido.itens || pedido.itens.length === 0) {
        return reject(new Error('Pedido inválido ou sem itens.'));
      }

      // Atualizar a quantidade disponível dos produtos
      try {
        pedido.itens.forEach((item) => {
          const alimento = mockAlimentos.find((a) => a.id === item.id);
          if (!alimento) {
            throw new Error(`Alimento com ID ${item.id} não encontrado.`);
          }
          if (item.quantidadeSelecionada > alimento.quantidade) {
            throw new Error(
              `Quantidade de ${item.nome} excede o estoque disponível.`
            );
          }
          alimento.quantidade -= item.quantidadeSelecionada;
        });

        const novoPedido = {
          id: mockPedidos.length + 1,
          ...pedido,
          data: new Date(),
          status: 'Pendente', // Pode ser ajustado conforme necessário
        };
        mockPedidos.push(novoPedido);
        console.log('Novo pedido criado:', novoPedido);
        resolve(novoPedido);
      } catch (error) {
        reject(error);
      }
    });
  },

  getPedidos: async () => {
    return new Promise((resolve) => {
      resolve([...mockPedidos]); // Retorna uma cópia
    });
  },

  getCurrentUser: async () => {
    // Implemente a lógica para obter o usuário atual
    // Retorne um objeto de usuário ou null
    return {
      id: '1',
      nome: 'João Silva',
      tipo: 'consumidor', // ou 'agricultor'
    };
  },

  /**
   * Função para processar um pedido.
   * @param {Object[]} itens - Lista de itens do pedido.
   * @returns {Promise<string>} - Mensagem de confirmação ou erro.
   */
  processarPedido: async (itens) => {
    return new Promise((resolve, reject) => {
      try {
        // Iterar sobre cada item do pedido
        itens.forEach((item) => {
          const alimento = mockAlimentos.find((a) => a.id === item.id);
          if (!alimento) {
            throw new Error(`Alimento com ID ${item.id} não encontrado.`);
          }

          // Verificar se há estoque suficiente
          if (alimento.quantidade < item.quantidadeSelecionada) {
            throw new Error(
              `Estoque insuficiente para ${alimento.nome}. Disponível: ${alimento.quantidade}, Solicitado: ${item.quantidadeSelecionada}`
            );
          }

          // Decrementar o estoque
          alimento.quantidade -= item.quantidadeSelecionada;
          console.log(
            `Estoque atualizado para ${alimento.nome}: ${alimento.quantidade}`
          );
        });

        resolve('Pedido processado com sucesso.');
      } catch (error) {
        // Rejeita com a mensagem de erro como string
        reject(error.message);
      }
    });
  },
};

// Inicializar o banco de dados com dados iniciais
database.initDatabase();

export default database;