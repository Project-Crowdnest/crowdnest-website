// https://github.com/fridays/next-routes
// Allows manual boot of server by EXPLICITLY telling it to use
// the routes.js file in order to be able to use dynamic slugs
// in our urls.

const next = require('next');
const routes = require('./routes');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

const { createServer } = require('http')
app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if (err) throw err;
        console.log('Ready on localhost:3000');
    })
});