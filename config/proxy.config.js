module.exports = [
    {
        context: ['/v1'],
        target: 'http://127.0.0.1:3010',
        changeOrigin: true,
    },
]