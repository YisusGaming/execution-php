import express from 'express';
const app = express();

// settings
app.set('port', 3000);

// middlewares
app.use((req, res, next) => {
    console.log(`${req.url} -${req.method}`);
    next();
});

export default function listen(port?: number) {
    console.clear();
    console.log('Starting HTTP server...');
    app.listen(port ?? app.get('port'), () => {
        console.log(`HTTP server is now running at port ${port ?? app.get('port')}.`);
    });
}