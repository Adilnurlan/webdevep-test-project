const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use('/api', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
}, createProxyMiddleware({
    target: 'https://test.dev-webdevep.ru/auth-back/api/v2',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
}));

app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});
