const PROXY_CONFIG = [
    {
        context: ['/api'],
        // target: 'http://localhost:3000/',
        // target: 'http://localhost:8080/cursojavaee',
        // target: 'http://localhost:8080/cursojavaee-v1',
        target: 'http://localhost:8081/cursojavaee-v1',
        secure: false,
        logLevel: 'debug',
        pathRewrite: { '^/api': '' }
    }
];

module.exports = PROXY_CONFIG;

// para rodar pelo proxy usar o comando npm run start
