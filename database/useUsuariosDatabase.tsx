import { useSQLiteContext } from "expo-sqlite";

export type UsuariosDatabase = {
    nome: String;
    id: Number;
    email: String;
    senha: String;
    cep: String;
    endereco: String;
    numero: String;
    complemento: String;
    telefone: String;
    selectedPlan : String;
}

export function useUsuariosDatabase() {

    const database = useSQLiteContext();

    async function listar() {
        try {
            const resultado = await database.getAllAsync<UsuariosDatabase>('SELECT * FROM usuarios;');
            return resultado;
        } catch (error) {
            throw error    
        }
    }

    async function inserir(nome: String, email: String, senha: String, cep: String, endereco: String, numero: String, complemento: String, telefone: String, selectedPlan : String) {
        try {
            await database.execAsync(`INSERT INTO usuarios (nome, email, senha, cep, endereco, numero, complemento, telefone, selectedPlan) VALUES ('${nome}', '${email}', '${senha}', '${cep}', '${endereco}', '${numero}', '${complemento}', '${telefone}', '${selectedPlan}')`);
        } catch (error) {
            throw error;
        }
    }

    async function excluir(id: Number) {
        try {
            await database.execAsync(`DELETE FROM usuarios WHERE id = ${id}`);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async function atualizar(id: Number, senha: Number) {
        try {
            await database.execAsync(`UPDATE usuarios SET senha = '${senha}' WHERE id = '${id}'`); // Removed the extra comma
        } catch (error) {
            throw error;
        }
    }

    async function buscaUsuario(id: Number) {
        try {
            const query = "SELECT * FROM usuarios WHERE id = ?";
            const resultado = await database.getFirstAsync<UsuariosDatabase>(query, String(id));
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    return { inserir, excluir, atualizar, listar, buscaUsuario };
}
