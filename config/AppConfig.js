module.exports = {
    port: 3000,
    app: {
        connection: {
            port: 3000, // http(s) port
            security: {
                cookieSecret: 'ulysses'
            }
        },
        mode: 'DEV' // DEV or PROD,
    },
    db: {
        syncOnStartUp: false
    },
    redis: {
        port: 6379,
        host: '127.0.1',
        family: 4,
        user: '',
        db: 0
    },
    git: {
        basePath: './test/output/git'
    }
};
