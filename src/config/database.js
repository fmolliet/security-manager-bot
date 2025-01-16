'use strict';
const sqlBricks = require( "sql-bricks" );
const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync(':memory:');

const runSeed = () => {
    // Apaga a tabela se ela já existir
    database.exec(`DROP TABLE IF EXISTS registrations`);
    database.exec(`
        CREATE TABLE registrations(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        applicantId varchar(255) NOT NULL,
        curatorId varchar(255),
        finished BOOLEAN DEFAULT FALSE,
        body TEXT
        ) STRICT
    `);

};

runSeed();

module.exports = {
    /**
     * 
     * @param {string} userId 
     * @returns {}
     */
    getUserRegistration: async (userId) => {
        const query = database.prepare('SELECT * FROM registrations WHERE applicantId = ? AND finished = FALSE');
        query.run(1, userId)
        return await database.exec(query.expandedSQL)
    },

    insertValue: async (userId, body) => {
        const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
        insert.run(1, body);
        insert.run(2, body);
        
    },
    insert : ({ table, items }) => {
        const { text, values } = sqlBricks
          .insertInto(table, items)
          .toParams({ placeholder: "?" });
      
        const insertState = database.prepare(text);
        insertState.run(...values);
      
        console.log(`INSERT operation completed: inserted ${items.length} item(s) into ${table}`);
    }
}