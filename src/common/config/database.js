const mysql = require('think-model-mysql');

module.exports = {
    /**
     * see more: https://github.com/mysqljs/mysql#connection-options
     */
    handle: mysql,
    database: 'jingxi', // hiolabsDB
    prefix: 'hiolabs_',
    encoding: 'utf8mb4',
    host: '127.0.0.1',
    port: '3306',
    user: 'jngxee_admin',
    password: 'jngxee_admin',
    dateStrings: true
};
