const mysql = require('think-model-mysql');

module.exports = {
    /**
     * see more: https://github.com/mysqljs/mysql#connection-options
     */
    handle: mysql,
    database: 'jingxi', // hiolabsDB
    prefix: 'hiolabs_',
    encoding: 'utf8mb4',
    host: '192.144.217.153',
    port: '3306',
    user: 'root',
    password: 'nSCWxSPNwApGnwyJ',
    dateStrings: true
};
