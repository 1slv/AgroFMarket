import { type SQLiteDatabase }  from 'expo-sqlite';

export async function inicializeDatabase(database: SQLiteDatabase){
    await database.execAsync(
            ` 
            -- DROP TABLE IF EXISTS usuarios;
            -- DELETE FROM usuarios;

            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                email TEXT NOT NULL,
                senha TEXT NOT NULL,
                cep TEXT,
                endereco TEXT,
                numero TEXT,
                complemento TEXT,
                telefone TEXT,
                selectedPlan TEXT

        );

         -- INSERT INTO usuarios (nome,email,senha,cep,endereco,numero,complemento,telefone,selectedPlan) VALUES ('lucas unzer','lucasunzer@gmail.com','18102006','192983','rua natal coneglian vila cachuerinha','112','perto da vila das puta','1499999999','Outros');

        `
    );
}

//O ULTIMO CAMPO OU É BOOLEAN OU STRING (se for string, ele recebe o nome do plano de saude selecionado, 
//se for boolean, é necessario um campo para cada plano disponivel (true ou false))

// sulamericana INTEGER,
// unimed INTEGER,
// bradesco INTEGER,
// amil INTEGER,
// biosaude INTEGER,
// biovida INTEGER,
// outros INTEGER,
// naotenhoplanodesaude INTEGER

//todos os CheckBox --------

//selectedPlan TEXT
