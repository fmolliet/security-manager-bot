'use strict';
const sqlBricks = require( "sql-bricks" );
const { DatabaseSync } = require('node:sqlite');
const { execute } = require("../events/ChatInputCommand");
const database = new DatabaseSync(':memory:');

const runSeed = () => {
    // Apaga a tabela se ela já existir
    try {
    database.exec(`DROP TABLE IF EXISTS registrations`);
    database.exec(`
        CREATE TABLE registrations(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        applicantId TEXT NOT NULL,
        curatorId TEXT,
        finished INTEGER DEFAULT 0,
        body TEXT
        ) STRICT
    `);
    console.log('Tabela "registrations" criada com sucesso.');
    } catch (error) {
        console.error('Erro ao criar a tabela:', error);
    }

};

runSeed();

module.exports = {
    /**
     * 
     * @param {string} userId 
     * @returns {Promise<any>}
     */
    getUserRegistration: async (userId) => {
        try {
            // Construir a consulta SQL usando sql-bricks
            const query = sqlBricks.select('*')
                .from('registrations')
                .where({ applicantId: userId, finished: 0 })
                .toString();
    
            return await executeDatabase(query)
        } catch (error) {
            console.error('Erro ao obter registros do usuário:', error);
            throw error;
        }

    },

    /**
     * 
     * @param {string} userId 
     * @param {string} body 
     * @returns {Promise<any>}
     */
    insertValue: async (userId, body) => {
    try {
        // Construir a consulta SQL usando sql-bricks
        const query = sqlBricks.insert('registrations', {
            applicantId: userId,
            body: body,
            finished: 0 // Assumindo que o valor padrão de finished é 0
        }).toString();

        return await executeDatabase(query)
    } catch (error) {
        console.error('Erro ao inserir valor:', error);
        throw error;
    }
},


    
}

/**
 * 
 * @param {*} query 
 * @returns 
 */
function executeDatabase(query) {
    return new Promise((resolve, reject) => {
        database.exec(query, function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}