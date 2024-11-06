console.log('Módulo database.js carregado');

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

  cadastrarUsuario: (tipo, nome, email, senha, telefone) => {
    const novoUsuario = {
      id: mockUsuarios.length + 1,
      tipo,
      nome,
      email,
      senha,
      telefone,
    };
    mockUsuarios.push(novoUsuario);
    return novoUsuario;
  },

  loginUsuario: (email, senha) => {
    return mockUsuarios.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );
  },

  adicionarHorta: (agricultorId, nomeHorta, localizacao) => {
    const agricultor = mockUsuarios.find((u) => u.id === agricultorId && u.tipo === 'agricultor');
    if (!agricultor) {
      throw new Error('Agricultor não encontrado.');
    }
    const novaHorta = {
      id: mockHortas.length + 1,
      agricultorId,
      nome: nomeHorta,
      localizacao,
      alimentos: [],
    };
    mockHortas.push(novaHorta);
    return novaHorta;
  },

  getHortasAgricultor: (agricultorId) => {
    const hortas = mockHortas.filter((horta) => horta.agricultorId === agricultorId);
    console.log(`Recuperando hortas para agricultor ID ${agricultorId}:`, hortas);
    return hortas.map((horta) => ({ ...horta }));
  },

  adicionarAlimento: (hortaId, nomeAlimento, preco, quantidade) => {
    const horta = mockHortas.find((h) => h.id === hortaId);
    if (!horta) {
      throw new Error('Horta não encontrada.');
    }
    const novoAlimento = {
      id: mockAlimentos.length + 1,
      hortaId, // Associando o alimento à horta correta
      nome: nomeAlimento,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade, 10),
    };
    mockAlimentos.push(novoAlimento);
    horta.alimentos.push(novoAlimento);
    return novoAlimento;
  },

  getAlimentosHorta: (hortaId) => {
    const alimentos = mockAlimentos.filter((a) => a.hortaId === hortaId);
    console.log(`Recuperando alimentos para horta ID ${hortaId}:`, alimentos);
    return alimentos.map((alimento) => ({ ...alimento }));
  },

  getTodasHortas: () => {
    console.log('Recuperando todas as hortas:', mockHortas);
    return mockHortas.map((horta) => ({ ...horta }));
  },

  criarPedido: (pedido) => {
    console.log('Criando pedido:', pedido); // Log para depuração

    if (!pedido || !pedido.itens || pedido.itens.length === 0) {
      throw new Error('Pedido inválido ou sem itens.');
    }

    // Atualizar a quantidade disponível dos produtos
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
    return novoPedido;
  },

  getPedidos: () => {
    return mockPedidos.map((pedido) => ({ ...pedido }));
  },
};

export default database;