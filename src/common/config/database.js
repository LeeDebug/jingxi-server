const mysql = require('think-model-mysql');

module.exports = {
    handle: mysql,
    database: 'jingxi', // hiolabsDB
    prefix: 'hiolabs_',
    encoding: 'utf8mb4',
    host: '82.156.25.59', // 127.0.0.1
    port: '3306',
    user: 'sample_user',
    password: '',
    dateStrings: true
};
