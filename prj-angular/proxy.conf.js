const PROXY_CONFIG = [
    {
        context: ['/api'],
        // target: 'http://localhost:3000/',
        target: 'http://localhost:8080/cursojavaee',
        secure: false,
        logLevel: 'debug',
        pathRewrite: { '^/api': '' }
    }
];

module.exports = PROXY_CONFIG;

// para rodar pelo proxy usar o comando npm run start
